import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ShopService } from './shop.service';
import { CreateShop } from './dto/create.dto';
import { JwtAuthGuard } from 'src/authGuard/jwtAuthGuard';
import { updateShop } from './dto/updateShop.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('/shop')
export class ShopController {
  constructor(private readonly appService: ShopService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getList() {
    return this.appService.getDataShop();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createShop(@Body() body: CreateShop) {
    return this.appService.createShop({
      title: body.title,
      description: body.description,
      account: body.account,
      product: body.product,
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID của shop cần cập nhật',
    example: '652a8d2f5a9e2b001f3d4bcd',
  })
  async updateShop(@Param('id') id: string, @Body() body: updateShop) {
    try {
      const result = await this.appService.updateShop(body, id);
      if (!result) {
        throw new NotFoundException('Không tồn tại shop');
      }

      return result;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID của shop cần cập nhật',
    example: '652a8d2f5a9e2b001f3d4bcd',
  })
  async deleteShop(@Param('id') id: string) {
    try {
      const result = await this.appService.deleteShop(id);

      return result;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }
}
