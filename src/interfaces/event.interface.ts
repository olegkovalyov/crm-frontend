import { GetEvent_getEvent } from './generated/GetEvent';

export interface EventInterface extends GetEvent_getEvent {
  id: string;
  name: string;
  date: Date;
  notes: string;
}

