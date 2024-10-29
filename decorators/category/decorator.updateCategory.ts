import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CustomApiResponseWithParam } from 'decorators/decorator.ApiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

export function updateCategory() {
  return applyDecorators(
    ApiForbiddenResponse({ description: 'Forbidden. Admin role required.' }),
    ApiBody({
      description: 'Payload to Update a Category',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Sport' },
          description: { type: 'string', example: 'muay thai is Best' },
        },
      },
    }),
    ApiOperation({
      summary: 'Update Category With ID',
      description: 'Updating the information of a Category with ID.',
    }),
    CustomApiResponseWithParam('ID of the Category', 'Category Not Found'),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('admin'),
  );
}
