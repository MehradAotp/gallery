import { Body, Controller, Post, Request, Get, Param } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/createPhotoDto';
import { ApiTags } from '@nestjs/swagger';
import { UploadPicture } from 'decorators/photo/decorator.uploadPhotos';
import { myPhotos } from 'decorators/photo/decorator.myPhotos';
import { allPhotos } from 'decorators/photo/decorator.allPhotos';
import { pendingPhotos } from 'decorators/photo/decorator.pendingPhotos';
import { rejectPhoto } from 'decorators/photo/decorator.rejectPhoto';
import { approvePhoto } from 'decorators/photo/decorator.approvePhoto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { toJalaali } from 'jalaali-js';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}
  //{Post} upload
  @Post('upload')
  @UploadPicture()
  async uploadPhoto(
    @Body() createPhotoDto: CreatePhotoDto,
    @Request() req: any,
  ) {
    // Save Photo And Change Name.
    // Date format as YYYY-MM-DD(Add Date Shamsi)
    const jalaaliDate = toJalaali(new Date());
    const dateFormat = `${jalaaliDate.jy}-${String(jalaaliDate.jm).padStart(2, '0')}-${String(jalaaliDate.jd).padStart(2, '0')}`;
    const username = req.user.username;
    const fileExtension = path.extname(createPhotoDto.file.originalName); // Get the file extension
    const uniqueId = uuidv4();
    const newFileName = `${dateFormat}_${username}_${uniqueId}${fileExtension}`;

    const uploadPath = path.join(process.cwd(), 'uploads', newFileName);

    // Create uploads directory if it doesn't exist
    try {
      await fs.mkdir(path.join(process.cwd(), 'uploads'), { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
    }

    // Write file buffer to the destination
    await fs.writeFile(uploadPath, createPhotoDto.file.buffer);

    return this.photoService.createPhoto(
      createPhotoDto,
      req.user.id,
      newFileName,
    );
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
