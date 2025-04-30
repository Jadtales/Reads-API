import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

// imported dtos
import { UpdateUser_dto, UserCreation_dto } from './dtos/user.dtos';

// imported Providers
import { UsersService } from './providers/users.service';
import { AuthAccessType } from '../../app-security/auth/decorators/auth-access.type';
import { AuthTypeEnum } from '../../app-security/auth/enums/auth-type.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --- User CRUD operations Section
  @Get('get-user-credentials/:id')
  getUserCredentialsById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getUserCredentialsById(id);
  }

  @Post('create-user')
  @UseInterceptors(ClassSerializerInterceptor)
  @AuthAccessType(AuthTypeEnum.None)
  createUser(@Body() requestUserCreation: UserCreation_dto) {
    return this.usersService.create_user(requestUserCreation);
  }

  @Put('update-user/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUser_dto,
  ) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }

  // @Get()
  // getUsers(
  //     @Query('usersQuantity', new DefaultValuePipe(1), ParseIntPipe)
  //     usersQuantity: number,
  //     @Query('cardsQuantity', new DefaultValuePipe(10), ParseIntPipe)
  //     cardsQuantity: number,
  // ) {
  //     return this.usersService.getUsers(usersQuantity, cardsQuantity);
  // }

  @Post('upload-avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.uploadAvatar(id, file);
  }
}
