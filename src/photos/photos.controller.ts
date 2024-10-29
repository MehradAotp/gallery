import {
  Body,
  Controller,
  Post,
  UploadedFile,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/createPhotoDto';
import { ApiTags } from '@nestjs/swagger';
import { UploadPicture } from 'decorators/photo/decorator.uploadPhotos';
import { myPhotos } from 'decorators/photo/decorator.myPhotos';
import { allPhotos } from 'decorators/photo/decorator.allPhotos';
import { pendingPhotos } from 'decorators/photo/decorator.pendingPhotos';
import { rejectPhoto } from 'decorators/photo/decorator.rejectPhoto';
import { approvePhoto } from 'decorators/photo/decorator.approvePhoto';
@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}
  //{Post} upload
  @Post('upload')
  @UploadPicture()
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPhotoDto: CreatePhotoDto,
    @Request() req: any,
  ) {
    const filename = file.filename;
    return this.photoService.createPhoto(createPhotoDto, req.user.id, filename);
  }
  //{GET} my-photos
  @Get('my-photos')
  @myPhotos()
  async getUserPhotos(@Request() req: any) {
    return this.photoService.getUserPhotos(req.user.id);
  }

  //{GET} all photos
  @Get()
  @allPhotos()
  async allApprovedPhoto() {
    return this.photoService.approvedPhoto();
  }
  //{GET} pending
  @Get('pending')
  @pendingPhotos()
  async getPendingPhotos() {
    return this.photoService.findPendingPhotos();
  }
  //{Post} approve with id
  @Post('approve/:id')
  @approvePhoto()
  async approvePhoto(@Param('id') photoId: string) {
    return this.photoService.approvePhoto(photoId);
  }
  //{Post} reject with id
  @Post('reject/:id')
  @rejectPhoto()
  async rejectPhoto(@Param('id') photoId: string) {
    return this.photoService.rejectPhoto(photoId);
  }
}
