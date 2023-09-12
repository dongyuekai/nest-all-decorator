import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const MyHeaders = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    console.log('dyk---key---', key); // Accept
    const request: Request = ctx.switchToHttp().getRequest();
    console.log('dyk---request.headers---', request.headers);
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);
