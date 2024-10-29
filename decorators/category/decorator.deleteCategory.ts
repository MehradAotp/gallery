import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOperation } from '@nestjs/swagger';
import { CustomApiResponseWithParam } from 'decorators/decorator.ApiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

export function deleteCategory() {
  return applyDecorators(
    ApiForbiddenResponse({ description: 'Forbidden. Admin role required.' }),
    ApiOperation({
      summary: 'Deleting Category With ID',
      description: 'Deleting the information of a Category with ID.',
    }),
    CustomApiResponseWithParam('ID of the Category', 'Category Not Found'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('admin'),
  );
}
