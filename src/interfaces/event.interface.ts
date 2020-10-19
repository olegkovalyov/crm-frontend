import { GetEvents_getEvents } from './generated/GetEvents';

export interface EventInterface extends GetEvents_getEvents {
  id: string;
  name: string;
  date: Date;
  notes: string;
}

