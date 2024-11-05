import { Role } from '../role.enum';

//اینترفیس برای ساخت یوزر
export class createUserDto {
  username: string;
  id: string;
  role: Role;
}
export class createUserInputDto {
  username: string;
  password: string;
}
