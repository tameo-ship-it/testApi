import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShop {
  @ApiProperty({
    description: 'Tiêu đề của shop',
    example: 'Shop điện tử ABC',
  })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @ApiProperty({
    description: 'Mô tả chi tiết của shop',
    example: 'Cung cấp các sản phẩm điện tử chất lượng cao',
  })
  @IsNotEmpty({ message: 'Mô tả Shop không được để trống' })
  description: string;

  @ApiProperty({
    description: 'Danh sách sản phẩm của shop',
    example: ['id sản phẩm'],
    type: [String], // khai báo đây là mảng string
  })
  @IsOptional()
  product: string[];

  @ApiProperty({
    description: 'ID tài khoản sở hữu shop',
    example: '64f1a5b7d8c2a1f23456789',
  })
  @IsNotEmpty({ message: 'không được để trống' })
  account: string;
}
