import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PhotoDocument, PhotoPopulatedDocument } from './photos.schema';
import { Model, Types } from 'mongoose';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { PhotoDto } from './dto/photo.dto';
import { Category } from 'src/category/category.schema';
import { User } from 'src/users/users.schema';
import { EmailService } from 'src/email/email.service';

interface UserForDisplay {
  _id: Types.ObjectId;
  username: string;
  role: 'admin' | 'user';
  email: string;
}
@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(PhotoDocument.name) private photoModel: Model<PhotoDocument>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(User.name) private userModel: Model<User>,
    private emailService: EmailService,
  ) {}

  async createPhoto(
    createPhotoDto: CreatePhotoDto,
    userId: string,
    filename: string,
  ): Promise<PhotoDto> {
    const categoryIds = createPhotoDto.categories;
    const categories = await this.categoryModel
      .find({ _id: { $in: categoryIds } })
      .exec();

    // بررسی اینکه تعداد رکوردهای پیدا شده برابر با تعداد شناسه‌ها باشد
    if (categories.length !== categoryIds.length) {
      throw new BadRequestException('One or more category IDs are invalid.');
    }
    const createdPhoto = new this.photoModel({
      ...createPhotoDto,
      uploadedBy: userId,
      filename,
    });

    const savedPhoto = await createdPhoto.save();
    const photoWithDetails = await this.photoModel
      .findById(savedPhoto._id)
      .exec();
    return this.mapToPhotoDto(photoWithDetails);
  }

  async approvedPhoto(): Promise<PhotoDto[]> {
    const photos = await this.photoModel.find({ status: 'approved' }).exec();

    return photos.map(this.mapToPhotoDto);
  }

  async getUserPhotos(userId: string): Promise<PhotoDto[]> {
    const photos = await this.photoModel.find({ uploadedBy: userId }).exec();

    return photos.map(this.mapToPhotoDto);
  }

  async findPendingPhotos(): Promise<PhotoDto[]> {
    const photos = await this.photoModel.find({ status: 'pending' }).exec();

    return photos.map(this.mapToPhotoDto);
  }

  async approvePhoto(photoId: string): Promise<PhotoDto> {
    const doc = await this.photoModel
      .findByIdAndUpdate(photoId, { status: 'approved' }, { new: true })
      .exec();
    const userDoc = await this.userModel.findById(doc.uploadedBy).lean();
    const user: UserForDisplay = {
      _id: userDoc._id as Types.ObjectId,
      username: userDoc.username,
      role: userDoc.role,
      email: userDoc.email,
    };
    await this.sendNotificationEmail(user, 'approved');

    return this.mapToPhotoDto(doc);
  }

  async rejectPhoto(photoId: string): Promise<PhotoDto> {
    const doc = await this.photoModel
      .findByIdAndUpdate(photoId, { status: 'rejected' }, { new: true })
      .exec();
    const userDoc = await this.userModel.findById(doc.uploadedBy).lean();
    const user: UserForDisplay = {
      _id: userDoc._id as Types.ObjectId,
      username: userDoc.username,
      role: userDoc.role,
      email: userDoc.email,
    };
    await this.sendNotificationEmail(user, 'rejected');
    return this.mapToPhotoDto(doc);
  }

  async displayPhoto(photoId: string, user: UserForDisplay): Promise<PhotoDto> {
    const photo = await this.photoModel.findById(photoId);
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    const isOwnerOrAdmin =
      user.role === 'admin' ||
      (photo.uploadedBy._id as Types.ObjectId).equals(user._id);

    if (!isOwnerOrAdmin && photo.status !== 'approved') {
      throw new NotFoundException('Photo is not available');
    }
    return this.mapToPhotoDto(photo);
  }

  private async sendNotificationEmail(user: UserForDisplay, status: string) {
    const statusMessage = status === 'approved' ? 'تایید شد' : 'رد شد';
    try {
      await this.emailService.sendEmail(
        user.email,
        `وضعیت عکس شما به ${statusMessage} تغییر کرد`,
        `سلام ${user.username}، وضعیت عکس شما به ${statusMessage} تغییر کرده است.`,
      );
      console.log(`Email notification sent to ${user.email}.`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  //change schema to DTO
  private mapToPhotoDto(photo: PhotoPopulatedDocument): PhotoDto {
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
