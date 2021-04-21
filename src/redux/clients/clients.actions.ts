import { ClientInterface } from '../../interfaces/client.interface';
import {
  SET_CLIENT_STATUS_OPTIONS_FOR_FILTER,
  SET_CLIENTS, SET_CREATED_AT_MAX_FOR_FILTER, SET_CREATED_AT_MIN_FOR_FILTER,
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

export interface SetCreatedAtMinForFilterActionInterface {
  type: typeof SET_CREATED_AT_MIN_FOR_FILTER,
  payload: Date,
}

export interface SetCreatedAtMaxForFilterActionInterface {
  type: typeof SET_CREATED_AT_MAX_FOR_FILTER,
  payload: Date,
}

export const setCreatedAtMinForFilterAction = (date: Date): SetCreatedAtMinForFilterActionInterface => ({
  type: SET_CREATED_AT_MIN_FOR_FILTER,
  payload: date,
});

export const setCreatedAtMaxForFilterAction = (date: Date): SetCreatedAtMaxForFilterActionInterface => ({
  type: SET_CREATED_AT_MAX_FOR_FILTER,
  payload: date,
});

export const setClientStatusOptionsAction = (statuses: ClientStatus[]): SetClientStatusOptionsForFilterActionInterface => ({
  type: SET_CLIENT_STATUS_OPTIONS_FOR_FILTER,
  payload: statuses,
});

export const setClientsAction = (clients: ClientInterface[]): SetClientsActionInterface => ({
  type: SET_CLIENTS,
  payload: clients,
});

export type ClientsActionTypes = SetClientStatusOptionsForFilterActionInterface
  | SetClientsActionInterface
  | SetCreatedAtMinForFilterActionInterface
  | SetCreatedAtMaxForFilterActionInterface;
