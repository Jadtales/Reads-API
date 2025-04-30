import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { SharedContentResponseDTO } from '../dto/get-shared-content.dto';

@Injectable()
export class SharedContentInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): any{
    next.handle().pipe(
      map((data): SharedContentResponseDTO => {
        return {
          username: data.user.userUsername,
          content: data.content,
          bookAuthor: 'hello',
          bookName: 'hello'
        };
      }),
    );
  }
}
