import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { SetBankStocksDto } from './dto/bank-stock.dto';

@Controller('stocks')
@UseInterceptors(ClassSerializerInterceptor)
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async findAll() {
    return this.stocksService.findAll();
  }

  @Post()
  @HttpCode(200)
  async setStocks(@Body() dto: SetBankStocksDto) {
    await this.stocksService.setStocks(dto);
    return;
  }
}
