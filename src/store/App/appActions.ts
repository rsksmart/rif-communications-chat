import { IAction } from 'store/storeUtils/IAction';

export enum APP_ACTIONS {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_MESSAGE = 'SET_MESSAGE',
  SET_ERROR = 'SET_ERROR',
  UNSET = 'UNSET',
}

export interface Action extends IAction {
  type: APP_ACTIONS;
}
