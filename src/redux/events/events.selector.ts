import { RootStateInterface } from '../root.reducer';
import { EventInterface } from '../../interfaces/event.interface';

export const getEvents = (state: RootStateInterface): EventInterface[] => state.events.events;

