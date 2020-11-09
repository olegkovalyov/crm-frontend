import { GetClient_getClient } from './generated/GetClient';
import { ClientStatus, PaymentStatus } from './generated/globalTypes';

export interface ClientInterface extends GetClient_getClient {

}

export type ClientStatusCheckBoxesStateType = {
  [key in ClientStatus]?: boolean
};

export type PaymentStatusCheckBoxesStateType = {
  [key in PaymentStatus]?: boolean
};
