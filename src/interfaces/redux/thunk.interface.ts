import { LoginInput } from '../generated/globalTypes';
import { NextRouter } from 'next/router';
import { Dispatch } from 'redux';

export interface SerializedErrorInterface {
  name?: string
  message?: string
  code?: string
  stack?: string
}

export interface PendingActionInterface<ThunkArg> {
  type: string
  payload: undefined
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

export interface FulfilledActionInterface<ThunkArg, PromiseResult> {
  type: string
  payload: PromiseResult
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

export interface RejectedActionInterface<ThunkArg> {
  type: string
  payload: unknown
  error: SerializedErrorInterface | unknown
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
    condition: boolean
  }
}

export interface RejectedWithValueAction<ThunkArg, RejectedValue> {
  type: string
  payload: RejectedValue
  error: { message: 'Rejected' }
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
  }
}

export type Pending = <ThunkArg>(
  requestId: string,
  arg: ThunkArg,
) => PendingActionInterface<ThunkArg>

export type Fulfilled = <ThunkArg, PromiseResult>(
  payload: PromiseResult,
  requestId: string,
  arg: ThunkArg,
) => FulfilledActionInterface<ThunkArg, PromiseResult>

export type Rejected = <ThunkArg>(
  requestId: string,
  arg: ThunkArg,
) => RejectedActionInterface<ThunkArg>

export type RejectedWithValue = <ThunkArg, RejectedValue>(
  requestId: string,
  arg: ThunkArg,
) => RejectedWithValueAction<ThunkArg, RejectedValue>

export interface LoginThunkInputInterface extends LoginInput {
}

export interface AccessTokenThunkInputInterface {
  router: NextRouter;
}

export interface AccessDeniedThunkInputInterface {
  router: NextRouter;
}