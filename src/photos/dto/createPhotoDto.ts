import { IsNotEmpty, IsString } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class CreatePhotoDto {
  /**
   * DTO for creating a photo
   */
  @IsNotEmpty()
  @IsString()
  title: string;

  categories: string[];

  @IsString()
  description?: string;

  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  file: MemoryStoredFile;
}
