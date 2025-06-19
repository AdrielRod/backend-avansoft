import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()  
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;
}
