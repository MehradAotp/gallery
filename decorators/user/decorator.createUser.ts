import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

export function createUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new User',
      description: 'Creates a new User by providing Username, Password.',
      operationId: 'createUserDto',
    }),
    ApiBody({
      description: 'payload to create a new user',
      schema: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            example: 'mehrad',
          },
          password: {
            type: 'string',
            example: 'Iran123',
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error.',
    }),
    ApiBadRequestResponse({ description: 'Invalid input data.' }),
    ApiCreatedResponse({
      description: 'The User has been successfully created.',
    }),
  );
}
