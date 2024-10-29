import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo } from './photos.schema';
import { Model } from 'mongoose';
import { CreatePhotoDto } from './dto/createPhotoDto';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {}

  async createPhoto(
    createPhotoDto: CreatePhotoDto,
    userId: string,
    filename: string,
  ): Promise<Photo> {
    const createdPhoto = new this.photoModel({
      ...createPhotoDto,
      uploadedBy: userId,
      filename,
    });
    return createdPhoto.save();
  }

  async approvedPhoto(): Promise<Photo[]> {
    return this.photoModel.find({ status: 'approved' }).populate({
      path: 'uploadedBy',
      select: '-password', // حذف فیلد password از خروجی
    });
  }

  async getUserPhotos(userId: string): Promise<Photo[]> {
    return this.photoModel.find({ uploadedBy: userId });
  }

  async findPendingPhotos(): Promise<Photo[]> {
    return this.photoModel.find({ status: 'pending' }).populate({
      path: 'uploadedBy',
      select: '-password', // حذف فیلد password از خروجی
    });
  }

  async approvePhoto(photoId: string): Promise<Photo> {
    return this.photoModel.findByIdAndUpdate(
      photoId,
      { status: 'approved' },
      { new: true },
    );
  }

  async rejectPhoto(photoId: string): Promise<Photo> {
    return this.photoModel.findByIdAndUpdate(
      photoId,
      { status: 'rejected' },
      { new: true },
    );
  }
}
