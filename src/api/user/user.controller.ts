import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/authGuard/jwtAuthGuard';
import { ApiParam } from '@nestjs/swagger';
import { UpdateUserInDto } from './dto/update.dto';

@Controller('/user')
export class userController {
  constructor(private readonly appService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getList() {
    return this.appService.getDataUser();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID của user cần cập nhật',
    example: '652a8d2f5a9e2b001f3d4bcd',
  })
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserInDto) {
    const result = await this.appService.updateUser(id, body);

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID của user cần xóa ',
    example: '652a8d2f5a9e2b001f3d4bcd',
  })
  async deleteUser(@Param('id') id: string) {
    const result = await this.appService.deleteUser(id);

    return result;
  }
}
