import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

export function login() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login User',
      description: 'Login User With username,password.',
    }),
    ApiBadRequestResponse({ description: 'Invalid input data.' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error.' }),
    ApiBody({
      description: 'Login User',
      schema: {
        type: 'object',
        properties: {
          username: { type: 'string', example: 'mehrad' },
          password: { type: 'string', example: 'Iran123' },
        },
      },
    }),
    ApiOkResponse({
      description: 'Login successfull.',
      type: [User],
      example: {
        message: 'Login successful',
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hc2VyIiwic3ViIjoiNjcxZWZjOTIzNmEzZmQ2ODVmZTY3YWVhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzAyMDI0ODMsImV4cCI6MTczMDIwOTY4M30.RY4lEz_FGiLEBA8CQXG1Gcjd-iFwhmNl4uF8OyBnvX0',
      },
    }),
  );
}
