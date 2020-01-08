import { initialState, IAppMessage } from './AppStore';
import { APP_ACTIONS } from './appActions';
import { Action } from 'store/App/appActions';

const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case APP_ACTIONS.SET_IS_LOADING:
      alert('WE ARE LOADING');
      break;
    case APP_ACTIONS.SET_ERROR:
      const appMessage: IAppMessage = {
        isError: true,
        message: action.payload,
      };
      state = {
        ...state,
        message: appMessage,
      };
      break;
    default:
      console.log('APP REDUCER FIRED!');
      return state;
  }
};
export default appReducer;
