import { IAction, IActionPayload } from 'store/storeUtils/interfaces'

export enum APP_ACTIONS {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_MESSAGE = 'SET_MESSAGE',
  UNSET = 'UNSET',
}

export interface ILoadingPayload extends IActionPayload {
  readonly isLoading: boolean
  readonly message?: string
}

export interface IMessagePayload extends IActionPayload {
  readonly isError?: boolean,
  readonly message: string
}

export type AppPayload = ILoadingPayload & IMessagePayload

export interface AppAction extends IAction<AppPayload> {
  type: APP_ACTIONS
}

