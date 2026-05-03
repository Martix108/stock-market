export interface IAuditLogData {
  type: string;
  walletId: string;
  stockName: string;
}

export class LogEntryDto {
  type: string;
  wallet_id: string;
  stock_name: string;

  constructor(partial: Partial<LogEntryDto>) {
    Object.assign(this, partial);
  }
}

export class LogResponseDto {
  log: LogEntryDto[];

  constructor(logs: IAuditLogData[]) {
    this.log = logs.map(
      (l) =>
        new LogEntryDto({
          type: l.type,
          wallet_id: l.walletId,
          stock_name: l.stockName,
        }),
    );
  }
}
