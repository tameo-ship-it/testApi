import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from 'src/schemas/shop.schema';
import { CreateShop } from './dto/create.dto';
import { updateShop } from './dto/updateShop.dto';

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop.name) private ShopModel: Model<Document>) {}

  async getDataShop() {
    const dataShop = await this.ShopModel.find()
      .populate('account', 'email userName')
      .populate('product');
    return dataShop;
  }

  async createShop(data: CreateShop) {
    const newShop = this.ShopModel.create(data);

    return newShop;
  }

  async updateShop(data: updateShop, id: string) {
    const result = await this.ShopModel.findByIdAndUpdate(
      id, // chỉ truyền id
      data, // object update
      { new: true }, // trả về document đã cập nhật
    );

    return {
      status: 201,
      message: 'Update thành công',
      data: result,
    };
  }

  async deleteShop(id: string) {
    const result = await this.ShopModel.findByIdAndDelete({ _id: id });

    if (!result) throw new NotFoundException('Không tồn tại Shop');

    return {
      status: 200,
      data: result,
    };
  }
}
