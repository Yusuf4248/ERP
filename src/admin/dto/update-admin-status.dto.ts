import { IsBoolean, IsOptional } from "class-validator";

export class UpdateAdminStatusDto {
  @IsOptional()
  @IsBoolean()
  is_creator?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
