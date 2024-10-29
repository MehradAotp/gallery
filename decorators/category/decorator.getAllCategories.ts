import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Category } from 'src/category/category.schema';

export function getAllCategories() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get All category',
      description: 'Get All category.',
    }),
    ApiOkResponse({
      description: 'Successfully fetched all Categories.',
      type: [Category],
      example: {
        sportCategory: {
          summary: 'Example for sport category',
          value: {
            _id: '671ef49ccc0cc0bb42d3d9be',
            name: 'sport',
            description: 'yoga',
          },
        },
        natureCategory: {
          summary: 'Example for nature category',
          value: {
            _id: '780gf29abc0cc0bb42d3d8cd',
            name: 'nature',
            description: 'mountains and rivers',
          },
        },
      },
    }),
  );
}
