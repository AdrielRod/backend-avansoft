import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  client_id: string;

  @IsString()  
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}
