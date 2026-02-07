import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsPublisher } from './events.publisher';

@Module({
  controllers: [EventsController],
  providers: [EventsPublisher]
})
export class EventsModule {}
