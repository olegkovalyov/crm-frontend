import { ADD_EVENT, DELETE_EVENT, SET_EVENTS, UPDATE_EVENT } from './events.types';
import { EventInterface } from '../../interfaces/event.interface';


export interface SetEventsActionInterface {
  type: typeof SET_EVENTS,
  payload: EventInterface[],
}

export interface AddEventActionInterface {
  type: typeof ADD_EVENT
  payload: EventInterface,
}

export interface DeleteEventActionInterface {
  type: typeof DELETE_EVENT
  payload: number,
}

export interface UpdateEventActionInterface {
  type: typeof UPDATE_EVENT
  payload: EventInterface,
}

export const setEventsAction = (events: EventInterface[]): SetEventsActionInterface => ({
  type: SET_EVENTS,
  payload: events,
});

export const addEventAction = (event: EventInterface): AddEventActionInterface => ({
  type: ADD_EVENT,
  payload: event,
});

export const deleteEventAction = (eventId: number): DeleteEventActionInterface => ({
  type: DELETE_EVENT,
  payload: eventId,
});

export const updateEventAction = (event: EventInterface): UpdateEventActionInterface => ({
  type: UPDATE_EVENT,
  payload: event,
});

export type EventsActionTypes = | SetEventsActionInterface
  | AddEventActionInterface
  | DeleteEventActionInterface
  | UpdateEventActionInterface;
