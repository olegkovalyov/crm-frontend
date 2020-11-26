import { GetEvent_getEvent } from './generated/GetEvent';

export interface EventInterface extends GetEvent_getEvent {
  date: Date;
}

