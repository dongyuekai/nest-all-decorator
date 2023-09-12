import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './aaa.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @SetMetadata('aaa', 'admin') // 不同的metadata设置太原始了 可以通过装饰器来设置
  @Aaa('admin2')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
