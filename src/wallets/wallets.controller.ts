import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { TradeStockDto } from './dto/trade-stock.dto';

@Controller('wallets')
@UseInterceptors(ClassSerializerInterceptor)
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post(':wallet_id/stocks/:stock_name')
  @HttpCode(200)
  async trade(
    @Param('wallet_id') walletId: string,
    @Param('stock_name') stockName: string,
    @Body() dto: TradeStockDto,
  ) {
    return this.walletsService.trade(walletId, stockName, dto);
  }

  @Get(':wallet_id')
  async getWallet(@Param('wallet_id') walletId: string) {
    return this.walletsService.getWalletState(walletId);
  }

  @Get(':wallet_id/stocks/:stock_name')
  async getQuantity(
    @Param('wallet_id') walletId: string,
    @Param('stock_name') stockName: string,
  ) {
    return this.walletsService.getStockQuantity(walletId, stockName);
  }
}
