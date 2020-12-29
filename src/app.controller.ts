import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('/')
  ping() {
    return 'Welcome to my Movie API';
  }
}
