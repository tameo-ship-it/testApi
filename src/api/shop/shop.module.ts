import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { Shop, ShopSchema } from 'src/schemas/shop.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
    JwtModule.register({
      secret: process.env.MY_SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
