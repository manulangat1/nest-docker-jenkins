import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators';
// import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guards';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Get('me')
  profile(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('me')
  editUser(@GetUser('id') userId: number) {
    return this.userService.editUser(userId);
  }
}
