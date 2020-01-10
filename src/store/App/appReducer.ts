import { initialState, IAppMessage } from './AppStore';
import { APP_ACTIONS } from './appActions';
import { Action } from 'store/App/appActions';

const { SET_IS_LOADING, SET_ERROR } = APP_ACTIONS;

// FIXME: Reducer should to be able to tell whether the action is meant for it
const appReducer = (state = initialState, action: Action) => {
  console.log('TCL: appReducer -> action', action);
  const { type, payload } = action;

  if (type) {
    switch (type) {
      case SET_IS_LOADING:
        alert('WE ARE LOADING');
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
        console.log('UNKNOWN APP REDUCER FIRED!');
        return state;
    }
  }
  return state;
};
export default appReducer;
