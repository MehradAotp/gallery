import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { SecurityApiResponse } from 'decorators/decorator.ApiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

export function pendingPhotos() {
  return applyDecorators(
    ApiOperation({
      summary: 'All Pending Photos',
      description: 'All Pending Photos Users.',
    }),
    SecurityApiResponse(),
    ApiInternalServerErrorResponse({ description: 'Internal server error.' }),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('admin'),
  );
}
