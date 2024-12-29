import {
  Body, ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query, UseInterceptors,
} from '@nestjs/common';

// imported DTOs
import FollowFollowingRelationDTO from './dtos/follow.dto';
import { UpdateUser_dto, UserCreation_dto } from './dtos/user.dtos';

// imported Providers
import { UsersService } from './providers/users.service';
import { FollowFollowingRelationServices } from './providers/follow_following_relation_service';
import { UsersStatsService } from './providers/users.stats.services';
import { AuthAccessType } from '../auth/decorators/auth-access.type';
import { AuthTypeEnum } from '../auth/enums/auth-type.enum';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // --- User CRUD operations Section
  @Get('get-user-credentials/:id')
  public getUserCredentialsById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getUserCredentialsById(id);
  }

  @Post('create-user')
  @UseInterceptors(ClassSerializerInterceptor)
  @AuthAccessType(AuthTypeEnum.None)
  public createUser(@Body() requestUserCreation: UserCreation_dto) {
    return this.usersService.create_user(requestUserCreation);
  }

  @Put('update-user/:id')
  // @AuthAccessType(AuthTypeEnum.None)
  public updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUser_dto,
  ) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete('delete-user/:id')
  public deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get()
  public getUsers(
    @Query('usersQuantity', new DefaultValuePipe(1), ParseIntPipe)
    usersQuantity: number,
    @Query('cardsQuantity', new DefaultValuePipe(10), ParseIntPipe)
    cardsQuantity: number,
  ) {
    return this.usersService.getUsers(usersQuantity, cardsQuantity);
  }



  // @Post(':id/upload-avatar')
  // @UseInterceptors(FileInterceptor('file'))
  // public uploadAvatar(
  //     @Param('id', new ParseUUIDPipe()) id: string,
  //     @UploadedFile() file: Express.Multer.File
  // ) {
  //     return this.usersService.uploadAvatar(id, file);
  // }


}
