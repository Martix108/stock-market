import { Controller, Post, HttpCode } from '@nestjs/common';

@Controller('chaos')
export class ChaosController {
  @Post()
  @HttpCode(200)
  killInstance() {
    setTimeout(() => {
      process.exit(1);
    }, 500);

    return { message: 'Instance is going down' };
  }
}
