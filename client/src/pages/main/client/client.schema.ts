import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ClientSchema {
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsPhoneNumber('UZ')
  number: string;

  @IsEmail()
  email: string;

  @IsDate()
  birthDate: Date;

  @IsOptional()
  @MaxLength(255)
  address: string;

  @IsOptional()
  @MaxLength(255)
  comments: string;

  @IsOptional()
  dept: number;
}
