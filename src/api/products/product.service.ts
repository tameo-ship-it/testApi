import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductIn } from './dto/createProduct.dto.in';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Document>,
  ) {}

  async createProduct(data: CreateProductIn) {
    const result = await this.ProductModel.create(data);

    if (!result) throw new BadRequestException('Lỗi khi tạo Sản phẩm');

    return {
      status: 200,
      message: 'tạo mới thành công',
      data: result,
    };
  }
}
