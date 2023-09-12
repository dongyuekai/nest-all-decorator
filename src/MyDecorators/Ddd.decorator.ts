// class装饰器
import { SetMetadata, Controller, applyDecorators } from '@nestjs/common';

// export const Ddd = () => Controller('ddd');

export const Ddd = (path, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('ddd', metadata));
};
