import { ClientStatus, PaymentStatus } from '../interfaces/generated/globalTypes';

export const clientStatuses = [
  ClientStatus.ACTIVE,
  ClientStatus.PROCESSED,
  ClientStatus.REFUSED,
];

export const paymentStatuses = [
  PaymentStatus.PAID,
  PaymentStatus.NOT_PAID,
  PaymentStatus.REFUNDED,
];
