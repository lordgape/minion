import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MySubscription } from './app.my.subscription.model';
import { AppService } from './app.service';
import { SubscriptionDto } from './dto/app.subscription-dto';
import { Topic } from './dto/app.topic';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHealth(): Promise<string> {
    return this.appService.getHealth();
  }

  @Get('/subscribe/:topic')
  async getSubscribersByTopic(@Param('topic') topic: string): Promise<Array<MySubscription>> {
    return this.appService.getSubscriberByTopic(topic);
  }

  @Post('/subscribe/:topic')
  async subscribe(@Body() subcriptionDto: SubscriptionDto, @Param() params: Topic): Promise<MySubscription> {
    const {topic} = params
    return this.appService.subscribe(subcriptionDto, topic);
  }

  @Post('/publish/:topic')
  async publishTopic(@Param() param: Topic, @Body() payload: object): Promise<object> {
    const {topic} = param;
    return this.appService.publishTopic(topic,payload);
  }
}
