import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';
import { StocksModule } from './stocks/stocks.module';
import { LogModule } from './log/log.module';
import { ChaosModule } from './chaos/chaos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    WalletsModule,
    StocksModule,
    LogModule,
    ChaosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
