import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class updateShop {
  @ApiProperty({
    description: 'ID của shop (tham số bắt buộc)',
    example: '652a8d2f5a9e2b001f3d4bcd',
  })
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'Tiêu đề của shop',
    example: 'Shop điện tử ABC',
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Mô tả chi tiết của shop',
    example: 'Cung cấp các sản phẩm điện tử chất lượng cao',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Chủ shop',
    example: 'Chủ shop',
  })
  @IsOptional()
  account: string;
}
