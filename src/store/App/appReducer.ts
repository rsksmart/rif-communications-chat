import { initialState, IAppMessage } from './AppStore';
import { APP_ACTIONS } from './appActions';
import { AppAction } from 'store/App/appActions';
import Logger from 'utils/Logger';

const { SET_IS_LOADING, SET_ERROR } = APP_ACTIONS;
const logger = Logger.getInstance();

// FIXME: Reducer should to be able to tell whether the action is meant for it
const appReducer = (state = initialState, action: AppAction) => {
  logger.debug('appReducer -> action', action);
  const { type, payload } = action;

  if (type) {
    switch (type) {
      case SET_IS_LOADING:
        const { isLoading, message } = payload;
        state = {
          ...state,
          message: {
            isLoading,
            message,
          },
        };
        break;
      case SET_ERROR:
        const appMessage: IAppMessage = {
          isError: true,
          message: payload,
        };
        state = {
          ...state,
          message: appMessage,
        };
        break;
      default:
        return state;
    }
  }
  return state;
};
export default appReducer;
