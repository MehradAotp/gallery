import { Role } from '../role.enum';

//اینترفیس برای ساخت یوزر
export interface createUserDto {
  username: string;
  id: string;
  role: Role;
}
