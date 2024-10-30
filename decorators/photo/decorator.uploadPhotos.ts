import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SecurityApiResponse } from 'decorators/decorator.ApiResponse';
import { FormDataRequest } from 'nestjs-form-data';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreatePhotoDto } from 'src/photos/dto/createPhotoDto';

export function UploadPicture() {
  return applyDecorators(
    ApiOperation({
      summary: 'Upload picture',
      description: 'Upload a picture for Gallery.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: CreatePhotoDto,
    }),
    SecurityApiResponse(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('user'),
    FormDataRequest(),
  );
}
