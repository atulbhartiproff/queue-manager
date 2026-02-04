import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class EventrequestDto{
    @IsString()
    @IsNotEmpty()
    event_id:String;

    @IsNotEmpty()
    @IsString()
    type:String;

    @IsNotEmpty()
    @IsString()
    timestamp:String;

    @IsObject()
    payload:Record<string, any>;
}