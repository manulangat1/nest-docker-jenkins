import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // this is a healthcheck endpoint
  getHello(): string {
    return this.appService.getHello();
  }
}
