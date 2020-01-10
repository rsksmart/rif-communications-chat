import { IAction } from 'store/storeUtils/IAction';

export enum APP_ACTIONS {
  SET_IS_LOADING = 'setIsLoading',
  SET_MESSAGE = 'setMessage',
  SET_ERROR = 'setError',
  UNSET = 'unset',
}

export interface Action extends IAction {
  type: APP_ACTIONS;
}
