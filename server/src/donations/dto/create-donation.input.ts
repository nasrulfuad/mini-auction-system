import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateDonationInput {
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  count: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  mobile: string;

  @IsString()
  @IsOptional()
  team: string;

  @IsOptional()
  @IsString()
  message: string;
}
