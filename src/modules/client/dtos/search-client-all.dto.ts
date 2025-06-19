import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/utils/pagination.dto";

export class SearchClientsQueryDto extends PaginationDto {
    @IsString()
    @IsOptional()
    filter_by?: "name" | "email";

    @IsString()
    @IsOptional()
    term?: string
}