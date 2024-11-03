// status.enum.ts
export enum StatusEnum {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

// category.dto.ts
export class CategoryDto {
  id: string;
  name: string;
}

// photo-uploaded-by.dto.ts
export class PhotoUploadedByDto {
  id: string;
  username: string;
}

export class PhotoDto {
  id: string;
  filename: string;
  title: string;
  categories: CategoryDto[];
  description?: string;
  status: StatusEnum;
  uploadedBy: PhotoUploadedByDto;
}
