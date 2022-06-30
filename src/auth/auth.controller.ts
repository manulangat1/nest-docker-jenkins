import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  login() {
    return this.authService.login();
  }
  @Post('logout')
  logout() {
    return this.authService.logout();
  }
  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}
