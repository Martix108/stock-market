export interface IWalletStockData {
  stockName: string;
  quantity: number;
}

export class WalletStockResponseDto {
  name: string;
  quantity: number;

  constructor(partial: Partial<WalletStockResponseDto>) {
    Object.assign(this, partial);
  }
}

export class WalletResponseDto {
  id: string;
  stocks: WalletStockResponseDto[];

  constructor(id: string, stocks: IWalletStockData[]) {
    this.id = id;
    this.stocks = stocks.map(
      (s) =>
        new WalletStockResponseDto({ name: s.stockName, quantity: s.quantity }),
    );
  }
}
