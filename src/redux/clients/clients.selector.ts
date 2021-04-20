import { RootStateInterface } from '../root.reducer';
import { ClientInterface } from '../../interfaces/client.interface';
import { ClientStatus } from '../../interfaces/generated/globalTypes';

export const getClientStatusOptionsForFilter = (state: RootStateInterface): ClientStatus[] => state.clients.clientStatusOptionsForFilter;

export const getClients = (state: RootStateInterface): ClientInterface[] => state.clients.clients;

