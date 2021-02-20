import { Injectable, Logger } from '@nestjs/common';
import { MySubscription } from './app.my.subscription.model';
import { SubscriptionDto } from './dto/app.subscription-dto';
import { ClientOptions, ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    const microserviceOptions: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: '172.25.0.25',
        port: 8877,
      },
    };

    this.client = ClientProxyFactory.create(microserviceOptions);
  }

  async getHealth(): Promise<string> {
    return 'Minion - Http Notification Service Client is Green';
  }

  async subscribe(subscriptionDto: SubscriptionDto, topic: string): Promise<MySubscription> {
    const sub: MySubscription = { topic, url: subscriptionDto.url };
    // send<ReturnType, ParamType>(pattern,augument)
    return this.client.send<MySubscription, any>('subscribe', sub).toPromise();
  }

  async getSubscriberByTopic(topic: string): Promise<Array<MySubscription>> {
    // send<ReturnType, ParamType>(pattern,augument)
    return this.client.send<Array<MySubscription>, string>('subscriptions', topic).toPromise();
  }

  async publishTopic(topic: string, payload: object): Promise<object> {
    // send<ReturnType, ParamType>(pattern,augument)
    return this.client
      .send<object, object>('publish', { topic, payload })
      .toPromise();
  }
}

const logger = new Logger('Main');
