import { RootStateInterface } from '../root.reducer';
import { ClientInterface } from '../../interfaces/client.interface';
import { ClientStatus } from '../../interfaces/generated/globalTypes';

export const getClientStatusOptionsForFilter = (state: RootStateInterface): ClientStatus[] => state.clients.clientStatusOptionsForFilter;

export const getCreatedAtMinForFilter = (state: RootStateInterface): Date => state.clients.createdAtMinForFilter;

export const getCreatedAtMaxForFilter = (state: RootStateInterface): Date => state.clients.createdAtMaxForFilter;

export const getClients = (state: RootStateInterface): ClientInterface[] => state.clients.clients;

