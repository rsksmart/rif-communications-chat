import { AppAction } from 'store/App/appActions';
import Logger from 'utils/Logger';
import { APP_ACTIONS } from './appActions';
import { IAppMessage, IAppState, initialState } from './AppStore';

const logger = Logger.getInstance();

const appReducer = (state = initialState, action: AppAction) => {
  const { type, payload } = action;
  const userAction = appActions[type];
  if (!!userAction) logger.debug('appReducer -> action', action);
  const newState = (!!userAction && userAction(state, payload)) || state;

  return newState;
};
export default appReducer;

type IAppActions = {
  [key in APP_ACTIONS]: (state: IAppState, payload: any) => IAppState;
};

const {
  SET_IS_LOADING,
  SET_ERROR,
  SET_MESSAGE,
  UNSET,
  NO_OPERATION,
} = APP_ACTIONS;

const appActions: IAppActions = {
  [SET_IS_LOADING]: (state, payload) => {
    const { isLoading, message } = payload;
    return {
      ...state,
      message: {
        isLoading,
        message,
      },
    };
  },
  [SET_ERROR]: (state, payload) => {
    const appMessage: IAppMessage = {
      isError: true,
      message: payload,
    };
    return {
      ...state,
      message: appMessage,
    };
  },
  [SET_MESSAGE]: (state, _payload) => state,
  [UNSET]: (state, _payload) => state,
  [NO_OPERATION]: (state, _payload) => state,
};
