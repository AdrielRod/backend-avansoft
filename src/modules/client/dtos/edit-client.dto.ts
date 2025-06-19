import { IsEmail, IsNotEmpty, IsNumber, IsString  } from 'class-validator';

export class EditClientParamDto {
  @IsString()
  @IsNotEmpty()
  id: string
}
export class EditClientBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string
}