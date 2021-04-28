import { GetEvents_getEvents } from './generated/GetEvents';

export interface EventInterface extends GetEvents_getEvents {
}

export interface InitialEventsPropTypesInterface {
  initialEvents: EventInterface[],
  initialEventsLoadErrorMessage: string | null
}

export interface ChangedEventInterface {
  id: {
    title?: string,
    id?: number;
    startDate?: Date;
    endDate?: Date;
  };
}

