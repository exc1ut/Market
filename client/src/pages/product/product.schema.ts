import {
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ProductSchema {
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  categoryId: string;

  @Min(0)
  cost: number;

  @Min(0)
  available: number;

  @IsOptional()
  @MaxLength(255)
  description: number;
}
