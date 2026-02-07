import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('event_created')
  handleEvent(@Payload() data:any){
    console.log('Worker Recieved Event', data);
  }
}
