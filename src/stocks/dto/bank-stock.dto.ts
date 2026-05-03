import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StockItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  quantity: number;
}

export class SetBankStocksDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockItemDto)
  stocks: StockItemDto[];
}
