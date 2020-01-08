import { initialState } from './AppStore';
import { APP_ACTIONS } from './appActions';
import { Action } from 'store/App/appActions';

const appReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case APP_ACTIONS.SET_IS_LOADING:
      alert('WE ARE LOADING');
      break;
    case APP_ACTIONS.SET_ERROR:
      alert(`there has been an error: ${action.payload}`);
    default:
      console.log('APP REDUCER FIRED!');
      return state;
  }
};
export default appReducer;
