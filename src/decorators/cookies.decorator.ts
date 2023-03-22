import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Cookies
 *  @description {Отдает куку по ключу}
 * */
export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
