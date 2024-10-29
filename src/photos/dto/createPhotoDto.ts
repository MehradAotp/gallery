import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: ['60d0fe4f5311236168a109ca', '60d0fe4f5311236168a109cb'],
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  categories: Types.ObjectId[];

  @IsString()
  description?: string;
}
