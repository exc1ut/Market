import {
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CategorySchema {
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  unit: string;

  @Min(0)
  @Max(100)
  sale: number;

  @IsOptional()
  @Min(0)
  @Max(100)
  tax: number;
}
