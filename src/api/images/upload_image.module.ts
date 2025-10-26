import { Module } from '@nestjs/common';
import { UploadController } from './upload_image.controller';
import { UploadService } from './upload_image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from 'src/schemas/images.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService], // ✅ để module khác có thể dùng
})
export class UploadModule {}
