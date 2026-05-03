import { IsEnum, IsNotEmpty } from 'class-validator';
import { TradeType } from './trade-type.enum';

export class TradeStockDto {
  @IsEnum(TradeType, { message: 'Type must be either buy or sell' })
  @IsNotEmpty()
  type: TradeType;
}
