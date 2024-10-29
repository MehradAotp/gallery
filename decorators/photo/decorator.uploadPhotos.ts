import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SecurityApiResponse } from 'decorators/decorator.ApiResponse';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

export function UploadPicture() {
  return applyDecorators(
    ApiOperation({
      summary: 'Upload picture',
      description: 'Upload a picture for Gallery.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
          title: {
            type: 'string',
            example: 'title',
          },
          description: {
            type: 'string',
            example: 'description',
          },
          categories: {
            type: 'array',
            items: { type: 'string', pattern: '^[a-f\\d]{24}$' },
            example: ['60d0fe4f5311236168a109ca', '60d0fe4f5311236168a109cb'],
          },
        },
      },
    }),
    SecurityApiResponse(),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('user'),
    UseInterceptors(
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
    ),
  );
}
