import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {redis} from './redis.client';
import { db } from './db.client';






// @Controller()
// export class AppController {
//   @EventPattern('event_created')
//   async handleEvent(@Payload() data:any){
//     const eventId=data.event_id;

//     const alreadyProcessed=await redis.get('processed:${eventId}');

//     if(alreadyProcessed){
//       console.log('Event already processed, skipping:', eventId);
//       return;
//     }

//     console.log('Processing event:', eventId);

//     await redis.set('processed:${eventId}', 'true');

//     await db.query(
//       `INSERT INTO events (event_id, type, timestamp, payload)
//    VALUES ($1, $2, $3, $4)`,
//   [eventId, data.type, data.timestamp, data.payload],
//     );

//     console.log(`🗄 Event stored in Postgres: ${eventId}`);
//     console.log('Event processed and marked as done:', eventId);
//   }
// }


@Controller()
export class AppController {
  @EventPattern('event_created')
  async handleEvent(@Payload() data: any) {
    const eventId = data.event_id;

    // 1. Idempotency check
    const alreadyProcessed = await redis.get(`processed:${eventId}`);

    if (alreadyProcessed) {
      console.log('Duplicate skipped:', eventId);
      return;
    }

    console.log('Processing event:', eventId);

    // 2. Store in Postgres
    await db.query(
      `INSERT INTO events (event_id, type, timestamp, payload)
       VALUES ($1, $2, $3, $4)`,
      [eventId, data.type, data.timestamp, data.payload],
    );

    console.log(`Stored in Postgres: ${eventId}`);

    // 3. Mark processed only after DB success
    await redis.set(`processed:${eventId}`, 'true');

    console.log('Event marked done:', eventId);
  }
}
