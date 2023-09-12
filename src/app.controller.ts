import {
  Controller,
  Get,
  SetMetadata,
  UseGuards,
  Headers,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './MyDecorators/aaa.decorator';
import { Ccc } from './MyDecorators/ccc.decorator';
import { MyHeaders } from './MyDecorators/MyHeaders.decorator';
import { MyQuery } from './MyDecorators/MyQuery.decorator';
import { Ddd } from './MyDecorators/Ddd.decorator';

// @Controller()
// @Ddd() // 自定义class的装饰器
@Ddd('eee', 'dyk') //地址就需要写 localhost:3000/eee/hello5 这样了
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @SetMetadata('aaa', 'admin') // 不同的metadata设置太原始了 可以通过装饰器来设置
  @Aaa('admin2')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello4') // 访问 localhost:3000/hello4访问此路由
  getHello4(@Ccc() c) {
    return c; // 参数装饰器的返回值就是参数的值
  }

  @Get('hello5')
  // 分别通过内置的 @Headers 装饰器和我们自己实现的 @MyHeaders 装饰器来取请求头，结果是一样的
  getHello5(@Headers('Accept') headers1, @MyHeaders('Accept') headers2) {
    console.log('header1===', headers1);
    console.log('header2===', headers2);
  }

  @Get('hello6') // http://localhost:3000/hello6?aaa=112&bbb=dyk
  // 分别通过内置的 @Qeury装饰器和我们自己实现的@MyQuery装饰器来取请求头，结果是一样的
  getHello6(@Query('aaa') aaa, @MyQuery('bbb') bbb) {
    console.log('aaa===', aaa); // 112
    console.log('bbb===', bbb); // dyk
  }

  @Get('hello7')
  // 通过Pipe做参数验证和转换
  getHello7(
    @Query('aaa', new ParseIntPipe()) aaa,
    @MyQuery('bbb', new ParseIntPipe()) bbb,
  ) {
    console.log('aaa===', aaa + 1); //
    console.log('bbb===', bbb + 1); //
  }
}
