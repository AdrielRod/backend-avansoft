import { IsNotEmpty, IsString  } from 'class-validator';

export class DeleteClientParamDto {
  @IsString()
  @IsNotEmpty()
  id: string
}
