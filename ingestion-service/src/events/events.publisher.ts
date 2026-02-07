import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class EventsPublisher {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'events.ingest',
        queueOptions: { durable: true },
      },
    });
  }

  async publishEvent(event: any) {
    return this.client.emit('event_created', event);
  }
}
