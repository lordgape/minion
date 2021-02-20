import { IsAlphanumeric } from 'class-validator';

export class Topic {
  @IsAlphanumeric()
  topic: string;
}
