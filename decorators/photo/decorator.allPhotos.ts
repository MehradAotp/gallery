import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

export function allPhotos() {
  return applyDecorators(
    ApiOperation({
      summary: 'All Photos',
      description: 'All Photos Approved in Gallery.',
    }),
    ApiOkResponse({
      description: 'Successfully Fetched All Events',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '671efeea36a3fd685fe67afc' },
            filename: {
              type: 'string',
              example: '1730084586414-753350255.png',
            },
            title: { type: 'string', example: 'today' },
            categories: {
              type: 'array',
              items: { type: 'string', example: '671ef49ccc0cc0bb42d3d9be' },
            },
            description: { type: 'string', example: 'Rain today' },
            status: { type: 'string', example: 'approved' },
            uploadedBy: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '671efc9236a3fd685fe67aea' },
                username: { type: 'string', example: 'naser' },
                role: { type: 'string', example: 'user' },
              },
            },
          },
        },
      },
    }),
  );
}
