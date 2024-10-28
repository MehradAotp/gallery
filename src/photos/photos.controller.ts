import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { Roles } from 'src/auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePhotoDto } from './dto/createPhotoDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPhotoDto: CreatePhotoDto,
    @Request() req: any,
  ) {
    const filename = file.filename;
    return this.photoService.createPhoto(createPhotoDto, req.user.id, filename);
  }

  @Get('my-photos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  async getUserPhotos(@Request() req: any) {
    return this.photoService.getUserPhotos(req.user.id);
  }

  @Get()
  async allApprovedPhoto() {
    return this.photoService.approvedPhoto();
  }

  @Get('pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getPendingPhotos() {
    return this.photoService.findPendingPhotos();
  }

  @Post('approve/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async approvePhoto(@Param('id') photoId: string) {
    return this.photoService.approvePhoto(photoId);
  }

  @Post('reject/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async rejectPhoto(@Param('id') photoId: string) {
    return this.photoService.rejectPhoto(photoId);
  }
}
