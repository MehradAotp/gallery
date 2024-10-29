import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import { SecurityApiResponse } from 'decorators/decorator.ApiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

export function myPhotos() {
  return applyDecorators(
    SecurityApiResponse(),
    ApiInternalServerErrorResponse({ description: 'Internal server error.' }),
    ApiOperation({
      summary: 'All Photos User',
      description: 'All Photos User in Gallery.',
    }),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('user'),
  );
}
