import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Mật khẩu không chính sác ');

    const payload = { email: user.email, sub: user._id };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.MY_SECRET_KEY,
      expiresIn: '24h',
    });

    return {
      accessToken: accessToken,
      userName: user.userName,
      email: user.email,
    };
  }

  async registerUser(email: string, password: string, userName: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new ConflictException('Đã tồn tại email');

    const hash = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      email,
      password: hash,
      userName,
    });
    const saveUser = await newUser.save();

    return {
      status: 200,
      message: 'Tạo mới thành công',
      data: saveUser.toObject(),
    };
  }
}
