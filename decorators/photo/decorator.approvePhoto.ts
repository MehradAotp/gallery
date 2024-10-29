import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CustomApiResponseWithParam } from 'decorators/decorator.ApiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

export function approvePhoto() {
  return applyDecorators(
    ApiOperation({
      summary: 'approve Photo',
      description: 'approve Photo with ID.',
    }),
    CustomApiResponseWithParam('ID of Pending Photos', 'Photo Not Found'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('admin'),
  );
}
