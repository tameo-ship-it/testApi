import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserInDto } from './dto/update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getDataUser() {
    const dataUser = await this.userModel.find();
    return dataUser;
  }

  async updateUser(id: string, data: UpdateUserInDto) {
    try {
      const user = await this.userModel.findById({ _id: id });

      if (!user) throw new NotFoundException('Không tồn tại USER');

      const hash = await bcrypt.hash(data.password, 10);

      const result = await this.userModel.findByIdAndUpdate(
        id,
        {
          ...data,
          password: hash,
        },
        {
          new: true,
        },
      );

      return {
        status: 200,
        message: 'Cập nhập thành công',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(id: string) {
    const result = await this.userModel.findByIdAndDelete({ _id: id });

    if (!result) throw new NotFoundException('Không tồn tại User');

    return {
      status: 201,
      message: 'Xóa thành công người dùng',
      data: result,
    };
  }
}
