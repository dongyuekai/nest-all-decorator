import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // guard通过reflector来取方法（handler）上设置的metadata
    console.log(this.reflector.get('aaa', context.getHandler())); // admin2
    // guard通过reflector来取class上设置的metadata
    console.log(this.reflector.get('ddd', context.getClass())); // dyk
    return true;
  }
}
