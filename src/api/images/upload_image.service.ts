import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from 'src/schemas/images.schema';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async handleUpload(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No files uploaded');
    }

    // const file = file.map((file) => ({
    //   filename: file.filename,
    //   path: `/uploads/${file.filename}`, // hoặc URL đầy đủ nếu cần
    // }));

    const imageFile = `/uploads/${file.filename}`;

    const result = await this.imageModel.create({
      image: imageFile,
    }); // Trả về danh sách file name (hoặc có thể build URL đầy đủ)
    return result;
  }
}
