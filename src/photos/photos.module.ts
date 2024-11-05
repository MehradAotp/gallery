import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoDocument, PhotoSchema } from './photos.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Category, CategorySchema } from 'src/category/category.schema';
import { User, UserSchema } from 'src/users/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([
      { name: PhotoDocument.name, schema: PhotoSchema },
    ]),
    NestjsFormDataModule,
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
