import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SetBankStocksDto, StockItemDto } from './dto/bank-stock.dto';

@Injectable()
export class StocksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<{ stocks: StockItemDto[] }> {
    const stocks = await this.prisma.bankStock.findMany({
      orderBy: { name: 'asc' },
    });

    return {
      stocks: stocks.map((s) => ({
        name: s.name,
        quantity: s.quantity,
      })),
    };
  }

  async setStocks(dto: SetBankStocksDto): Promise<{ success: boolean }> {
    return this.prisma.$transaction<{ success: boolean }>(async (tx) => {
      await tx.bankStock.deleteMany({});

      await tx.bankStock.createMany({
        data: dto.stocks.map((s) => ({
          name: s.name,
          quantity: s.quantity,
        })),
      });

      return { success: true };
    });
  }
}
