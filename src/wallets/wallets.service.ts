import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TradeStockDto } from './dto/trade-stock.dto';
import { WalletResponseDto } from './dto/wallet-response.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  async trade(
    walletId: string,
    stockName: string,
    dto: TradeStockDto,
  ): Promise<{ success: boolean }> {
    return this.prisma.$transaction<{ success: boolean }>(async (tx) => {
      //Check if stock exists in bank
      const bankStock = await tx.bankStock.findUnique({
        where: { name: stockName },
      });

      if (!bankStock) {
        throw new NotFoundException(`Stock ${stockName} not found in bank`);
      }

      //BUY
      if (dto.type === 'buy') {
        if (bankStock.quantity <= 0) {
          throw new BadRequestException('No stock in bank');
        }

        //Reduce stock in bank
        await tx.bankStock.update({
          where: { name: stockName },
          data: { quantity: { decrement: 1 } },
        });

        //Check if wallet exists
        await tx.wallet.upsert({
          where: { id: walletId },
          create: { id: walletId },
          update: {},
        });

        //Add stock to wallet
        await tx.walletStock.upsert({
          where: { walletId_stockName: { walletId, stockName } },
          create: { walletId, stockName, quantity: 1 },
          update: { quantity: { increment: 1 } },
        });
        //SELL
      } else {
        const walletStock = await tx.walletStock.findUnique({
          where: { walletId_stockName: { walletId, stockName } },
        });

        if (!walletStock || walletStock.quantity <= 0) {
          throw new BadRequestException(`No stock in wallet`);
        }

        //Increment stock in bank
        await tx.bankStock.update({
          where: { name: stockName },
          data: { quantity: { increment: 1 } },
        });

        //Decrement in wallet
        await tx.walletStock.update({
          where: { walletId_stockName: { walletId, stockName } },
          data: { quantity: { decrement: 1 } },
        });
      }

      //Save successful operation in Audit Log
      await tx.auditLog.create({
        data: {
          type: dto.type,
          walletId: walletId,
          stockName: stockName,
        },
      });

      return { success: true };
    });
  }

  async getWalletState(walletId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
      include: { stocks: true },
    });

    if (!wallet) {
      return new WalletResponseDto(walletId, []);
    }

    return new WalletResponseDto(wallet.id, wallet.stocks);
  }

  async getStockQuantity(walletId: string, stockName: string): Promise<number> {
    const ws = await this.prisma.walletStock.findUnique({
      where: { walletId_stockName: { walletId, stockName } },
    });
    return ws ? ws.quantity : 0;
  }
}
