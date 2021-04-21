import { ClientInterface } from '../../interfaces/client.interface';
import {
  SET_CLIENT_STATUS_OPTIONS_FOR_FILTER,
  SET_CLIENTS,
  SET_CREATED_AT_MAX_FOR_FILTER,
  SET_CREATED_AT_MIN_FOR_FILTER,
} from './clients.types';
import { ClientsActionTypes } from './clients.actions';
import { ClientStatus } from '../../interfaces/generated/globalTypes';

export interface ClientsStateInterface {
  clients: ClientInterface[],
  clientStatusOptionsForFilter: ClientStatus[],
  createdAtMinForFilter: Date,
  createdAtMaxForFilter: Date,
}

const initialMinDate = new Date();
initialMinDate.setMonth(initialMinDate.getMonth() - 1);

export const clientsInitialState: ClientsStateInterface = {
  clients: [],
  clientStatusOptionsForFilter: [],
  createdAtMinForFilter: initialMinDate,
  createdAtMaxForFilter: new Date(),
};

export const clientsReducer = (state = clientsInitialState, action: ClientsActionTypes): ClientsStateInterface => {
  switch (action.type) {
    case SET_CLIENTS : {
      return {
        ...state,
        clients: action.payload,
      };
    }
    case SET_CLIENT_STATUS_OPTIONS_FOR_FILTER: {
      return {
        ...state,
        clientStatusOptionsForFilter: action.payload,
      };
    }
    case SET_CREATED_AT_MIN_FOR_FILTER: {
      return {
        ...state,
        createdAtMinForFilter: action.payload,
      };
    }
    case SET_CREATED_AT_MAX_FOR_FILTER: {
      return {
        ...state,
        createdAtMaxForFilter: action.payload,
      };
    }
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
