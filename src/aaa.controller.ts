import {
  Controller,
  Get,
  HostParam,
  Req,
  Res,
  Next,
  HttpCode,
  Header,
  Redirect,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  @Get('bbb')
  hello(@HostParam('host') host) {
    return 'hello==' + host;
  }

  @Get('ccc')
  ccc(@Req() req: Request) {
    console.log('req.hostname===', req.hostname); // 127.0.0.1
    console.log('req.url===', req.url); // /aaa/ccc
  }

  @Get('ddd')
  ddd(@Res() res: Response) {
    console.log('dyk---res---', res);
    // return 'ddd====';
    res.end('ddd');
  }

  // 通过注入@Next将请求转发到第二个同名的handler
  @Get('eee')
  eee(@Next() next: NextFunction) {
    console.log('handler1===');
    next();
    return 'eee';
  }
  @Get('eee')
  eee2() {
    console.log('handler2===');
    return 'eee2';
  }

  // handler默认返回的是200的状态码 你可以通过@HttpCode修改它
  @Get('fff')
  @HttpCode(222)
  fff() {
    return 'hello';
  }

  // 修改response header 通过@Header装饰器
  @Get('ggg')
  @Header('aaa', 'bbb')
  ggg() {
    return 'hello';
  }

  // 通过@Redirect装饰器来指定路由重定向的url
  @Get('hhh')
  @Redirect('http://juejin.cn')
  hhh() {
    console.log('redirect---');
  }

  // 在返回值的地方设置url
  @Get('xxx')
  @Redirect()
  async jump() {
    return {
      url: 'https://www.baidu.com',
      statusCode: 302,
    };
  }
}

// 此时访问地址变成 http://127.0.0.1:3000/aaa/bbb
