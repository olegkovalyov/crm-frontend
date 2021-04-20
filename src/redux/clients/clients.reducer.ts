import { ClientInterface } from '../../interfaces/client.interface';
import {
  SET_CLIENT_PAYMENT_STATUS_OPTIONS_FOR_FILTER,
  SET_CLIENT_STATUS_OPTIONS_FOR_FILTER,
  SET_CLIENTS,
} from './clients.types';
import { ClientsActionTypes } from './clients.actions';
import { ClientStatus } from '../../interfaces/generated/globalTypes';

export interface ClientsStateInterface {
  clients: ClientInterface[],
  clientStatusOptionsForFilter: ClientStatus[],
}

export const clientsInitialState: ClientsStateInterface = {
  clients: [],
  clientStatusOptionsForFilter: [],
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
    default:
      // eslint-disable-next-line no-case-declarations,no-unused-vars,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
