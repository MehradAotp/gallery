import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  categories: string[];

  @IsString()
  description?: string;

  @ApiProperty({
    description: 'file',
    type: 'string',
    format: 'binary',
  })
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
}
