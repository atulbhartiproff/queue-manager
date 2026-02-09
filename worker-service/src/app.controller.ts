import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {redis} from './redis.client';

@Controller()
export class AppController {
  @EventPattern('event_created')
  async handleEvent(@Payload() data:any){
    const eventId=data.event_id;

    const alreadyProcessed=await redis.get('processed:${eventId}');

    if(alreadyProcessed){
      console.log('Event already processed, skipping:', eventId);
      return;
    }

    console.log('Processing event:', eventId);

    await redis.set('processed:${eventId}', 'true');

    console.log('Event processed and marked as done:', eventId);
  }
}
