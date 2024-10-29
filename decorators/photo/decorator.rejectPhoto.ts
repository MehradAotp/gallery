import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CustomApiResponseWithParam } from 'decorators/decorator.ApiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

export function rejectPhoto() {
  return applyDecorators(
    ApiOperation({
      summary: 'reject Photo',
      description: 'reject Photo with ID.',
    }),
    CustomApiResponseWithParam('ID of reject Photos', 'Photo Not Found'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('admin'),
  );
}
