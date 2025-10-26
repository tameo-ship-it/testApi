import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/authGuard/jwtAuthGuard';
import { CreateProductIn } from './dto/createProduct.dto.in';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() body: CreateProductIn) {
    const result = await this.productService.createProduct(body);
    return result;
  }
}
