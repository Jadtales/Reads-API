import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SharedContentService } from './shared-content.service';
import { AuthAccessType } from '../../app-security/auth/decorators/auth-access.type';
import { AuthTypeEnum } from '../../app-security/auth/enums/auth-type.enum';
import { SharedContentInterceptor } from './interceptors/shared-content.interceptor';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('shared-content')
export class SharedContentController {
  constructor(private readonly sharedContentService: SharedContentService) {}

  @CacheTTL(10 * 1000) // 1 minute
  @Get('content')
  @AuthAccessType(AuthTypeEnum.None)
  sharedContent(
    @Query('username') username: string,
    @Query('content-id', new ParseIntPipe()) contentId: number,
  ) {
    return this.sharedContentService.getSharedContent(username, contentId);
  }
}
