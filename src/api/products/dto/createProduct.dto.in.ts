import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductIn {
  @ApiProperty({
    description: 'Tiêu đề của sản phẩm',
    example: 'Shop điện tử ABC',
  })
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  title: string;

  @ApiProperty({
    description: 'Mô tả chi tiết của sản phẩm',
    example: 'Cung cấp các sản phẩm điện tử chất lượng cao',
  })
  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  description: string;

  @ApiProperty({
    description: 'Danh sách URL hình ảnh của sản phẩm',
    example: ['id image'],
    type: [String], // khai báo đây là mảng string
  })
  @IsOptional()
  image: string[];

  @ApiProperty({
    description: 'Số lượng của sản phẩm',
    example: 'Số lượng',
  })
  @IsNumber({}, { message: 'Số lượng phải là một số' })
  quantity: number;

  @ApiProperty({
    description: 'Giá của sản phẩm',
    example: 'Giá tiền ',
  })
  @IsNumber({}, { message: 'Giá sản phẩm phải là một số' })
  price: number;
}
