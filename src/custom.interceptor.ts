import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";

export class CustomIntercepter implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createdAt: data.created_at,
        }
        delete response.created_at
        delete response.updated_at

        return response
      }),
    )
  }
}