import { ADD_EVENT, DELETE_EVENT, SET_EVENTS, UPDATE_EVENT } from './events.types';
import { EventInterface } from '../../interfaces/event.interface';
import { EventsActionTypes } from './events.actions';

export interface EventsStateInterface {
  events: EventInterface[],
}


export const eventsInitialState: EventsStateInterface = {
  events: [],
};

export const eventsReducer = (state = eventsInitialState, action: EventsActionTypes): EventsStateInterface => {
  switch (action.type) {
    case SET_EVENTS : {
      return {
        ...state,
        events: action.payload,
      };
    }
    case ADD_EVENT: {
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    }
    case DELETE_EVENT: {
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    }
    case UPDATE_EVENT: {
      const updatedEvents = [
        ...state
          .events
          .filter((event) => event.id !== action.payload.id), action.payload,
      ];
      return {
        ...state,
        events: updatedEvents,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
