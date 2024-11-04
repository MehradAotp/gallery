import {
  Body,
  Controller,
  Post,
  Request,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/createPhotoDto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { toJalaali } from 'jalaali-js';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}
  //{Post} upload
  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @FormDataRequest()
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getUserPhotos(@Request() req: any) {
    return this.photoService.getUserPhotos(req.user.id);
  }

  //{GET} all photos
  @Get()
  async allApprovedPhoto() {
    return this.photoService.approvedPhoto();
  }
  //{GET} pending
  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getPendingPhotos() {
    return this.photoService.findPendingPhotos();
  }
  //{Post} approve with id
  @Post('approve/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async approvePhoto(@Param('id') photoId: string) {
    return this.photoService.approvePhoto(photoId);
  }
  //{Post} reject with id
  @Post('reject/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async rejectPhoto(@Param('id') photoId: string) {
    return this.photoService.rejectPhoto(photoId);
  }
}
