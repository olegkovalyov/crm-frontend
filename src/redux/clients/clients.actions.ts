import { ClientInterface } from '../../interfaces/client.interface';
import {
  SET_CLIENT_STATUS_OPTIONS_FOR_FILTER,
  SET_CLIENTS,
} from './clients.types';
import { ClientStatus } from '../../interfaces/generated/globalTypes';

export interface SetClientStatusOptionsForFilterActionInterface {
  type: typeof SET_CLIENT_STATUS_OPTIONS_FOR_FILTER,
  payload: ClientStatus[],
}

export interface SetClientsActionInterface {
  type: typeof SET_CLIENTS,
  payload: ClientInterface[],
}

export const setClientStatusOptionsAction = (statuses: ClientStatus[]): SetClientStatusOptionsForFilterActionInterface => ({
  type: SET_CLIENT_STATUS_OPTIONS_FOR_FILTER,
  payload: statuses,
});

export const setClientsAction = (clients: ClientInterface[]): SetClientsActionInterface => ({
  type: SET_CLIENTS,
  payload: clients,
});

export type ClientsActionTypes = SetClientStatusOptionsForFilterActionInterface
  | SetClientsActionInterface;
