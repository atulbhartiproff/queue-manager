import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EventrequestDto } from './dto/event-request.dto';

@Controller('events')
export class EventsController {
    @Post()
    @HttpCode(202)
    ingestevent(@Body() body:EventrequestDto){
        console.log('Recieved body',body);
        return;
    }
}
