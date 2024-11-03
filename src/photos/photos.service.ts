import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Photo } from './photos.schema';
import { Model } from 'mongoose';
import { CreatePhotoDto } from './dto/createPhotoDto';
import { PhotoDto } from './dto/photoDto';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo.name) private photoModel: Model<Photo>) {}

  async createPhoto(
    createPhotoDto: CreatePhotoDto,
    userId: string,
    filename: string,
  ): Promise<PhotoDto> {
    const createdPhoto = new this.photoModel({
      ...createPhotoDto,
      uploadedBy: userId,
      filename,
    });

    const savedPhoto = await createdPhoto.save();
    const photoWithDetails = await this.photoModel
      .findById(savedPhoto._id)
      .populate('categories', '_id name')
      .populate('uploadedBy', '_id username')
      .lean();

    return this.mapToPhotoDto(photoWithDetails);
  }

  async approvedPhoto(): Promise<PhotoDto[]> {
    const photos = await this.photoModel
      .find({ status: 'approved' })
      .populate('categories', '_id name')
      .populate('uploadedBy', '_id username')
      .lean();

    return photos.map(this.mapToPhotoDto);
  }

  async getUserPhotos(userId: string): Promise<PhotoDto[]> {
    const photos = await this.photoModel
      .find({ uploadedBy: userId })
      .populate('categories', '_id name')
      .populate('uploadedBy', '_id username')
      .lean();

    return photos.map(this.mapToPhotoDto);
  }

  async findPendingPhotos(): Promise<PhotoDto[]> {
    const photos = await this.photoModel
      .find({ status: 'pending' })
      .populate('categories', '_id name')
      .populate('uploadedBy', '_id username')
      .lean();

    return photos.map(this.mapToPhotoDto);
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
  private mapToPhotoDto(photo: any): PhotoDto {
    const { _id, filename, title, description, status, uploadedBy } = photo;
    const categories = photo.categories ?? [];

    return {
      id: _id?.toString() || 'unknown',
      filename,
      title,
      categories: categories.map(({ _id, name }) => ({
        id: _id?.toString() || 'unknown',
        name: name || 'unknown',
      })),
      description,
      status,
      uploadedBy: {
        id: uploadedBy?._id?.toString() || 'unknown',
        username: uploadedBy?.username || 'unknown',
      },
    };
  }
}
