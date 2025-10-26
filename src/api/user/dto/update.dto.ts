import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Matches, MinLength } from 'class-validator';

export class UpdateUserInDto {
  @ApiProperty({
    description: 'Tên người dùng',
    example: 'Nguyễn văn A',
  })
  @IsOptional()
  userName: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'abc123456',
  })
  @MinLength(8, { message: 'Password phải có ít nhất 8 ký tự' })
  @Matches(/(?=.*[a-z])/, { message: 'Password phải có ít nhất 1 chữ thường' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password phải có ít nhất 1 chữ hoa' })
  @Matches(/(?=.*\d)/, { message: 'Password phải có ít nhất 1 số' })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'Password phải có ít nhất 1 ký tự đặc biệt',
  })
  password: string;
}
