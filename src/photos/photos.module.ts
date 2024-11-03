import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './photos.schema';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Category, CategorySchema } from 'src/category/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Photo.name, schema: PhotoSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    NestjsFormDataModule,
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
