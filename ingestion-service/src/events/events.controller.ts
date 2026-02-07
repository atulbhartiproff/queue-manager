import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EventrequestDto } from './dto/event-request.dto';
import { EventsPublisher } from './events.publisher';

@Controller('events')
export class EventsController {
    constructor(private publisher:EventsPublisher){}
    
    @Post()
    @HttpCode(202)
    async ingestevent(@Body() body:EventrequestDto){
        await this.publisher.publishEvent(body);
        return;
    }
}
