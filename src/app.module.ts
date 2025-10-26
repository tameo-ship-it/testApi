import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './api/user/user.module';
import { ShopModule } from './api/shop/shop.module';
import { UploadModule } from './api/images/upload_image.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './api/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // optional: load .env
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
    JwtModule.register({
      secret: `${process.env.MY_SECRET_KEY}`,
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    ShopModule,
    UploadModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
