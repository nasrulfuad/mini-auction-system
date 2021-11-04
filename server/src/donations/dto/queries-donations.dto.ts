import { IsOptional, IsString, IsUUID } from 'class-validator';

export class QueriesDonationsDto {
  @IsOptional()
  @IsString()
  field: string;

  @IsOptional()
  @IsString()
  direction: string;

  @IsOptional()
  @IsUUID()
  cursor: string;
}
