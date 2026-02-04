import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('events')
export class EventsController {
    @Post()
    @HttpCode(202)
    ingestevent(@Body() body:any){
        console.log('Recieved body',body);
        return;
    }
}
