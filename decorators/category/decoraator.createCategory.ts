import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CustomApiResponse } from 'decorators/decorator.ApiResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

export function createCategory() {
  return applyDecorators(
    CustomApiResponse(),
    ApiForbiddenResponse({ description: 'Forbidden. Admin role required.' }),
    ApiOperation({
      summary: 'Create a new category',
      description:
        'Create a Category for an Photo by providing name, description.',
      operationId: 'CreateCategoryDto',
    }),
    ApiBody({
      description: 'Payload to create a Category',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Sport' },
          description: { type: 'string', example: 'muay thai is Best' },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'The Category has been successfully created.',
    }),
    UseGuards(JwtAuthGuard, RolesGuard),
    Roles('admin'),
  );
}
