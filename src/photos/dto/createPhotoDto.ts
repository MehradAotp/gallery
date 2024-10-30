import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  title: string;

  @ApiProperty({
    example: ['60d0fe4f5311236168a109ca', '60d0fe4f5311236168a109cb'],
    type: [String],
  })
  categories: string[];

  @ApiProperty({})
  @IsString()
  description?: string;

  @ApiProperty({ type: 'file' })
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
}
