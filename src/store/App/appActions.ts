import { IAction } from 'store/storeUtils/interfaces';

export enum APP_ACTIONS {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_MESSAGE = 'SET_MESSAGE',
  SET_ERROR = 'SET_ERROR',
  UNSET = 'UNSET',
  NO_OPERATION = 'NO_OPERATION',
}

export interface AppAction extends IAction {
  type: APP_ACTIONS;
}
