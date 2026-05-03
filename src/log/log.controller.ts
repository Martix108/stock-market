import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { LogService } from './log.service';

@Controller('log')
@UseInterceptors(ClassSerializerInterceptor)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  async findAll() {
    return this.logService.findAll();
  }
}
