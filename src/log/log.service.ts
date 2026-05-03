import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogResponseDto } from './dto/log-response.dto';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<LogResponseDto> {
    const logs = await this.prisma.auditLog.findMany({
      orderBy: { id: 'asc' },
    });

    return new LogResponseDto(logs);
  }
}
