import { initialState } from './UserStore';
import { USER_ACTIONS, sayHeloToUser, UserAction } from './userActions';
import LocalStorage from 'api/LocalStorage';

const { SETUP_USER: CREATE_RNS, SET_CLIENT_NODE } = USER_ACTIONS;

const localStorage = LocalStorage.getInstance();

// FIXME: Reducer should to be able to tell whether the action is meant for it
const userReducer = (state = initialState, action: UserAction) => {
  console.log('TCL: userReducer -> action', action);
  const { type, payload } = action;

  if (type) {
    switch (type) {
      case SET_CLIENT_NODE:
        state = {
          ...state,
          ...payload,
        };
        const { user } = state;
        const rnsName = user && user.rnsName;
        localStorage.setItem('rnsName', rnsName || '');
        return state;
      case CREATE_RNS:
        if (payload && payload.user) {
          state = {
            ...state,
            user: payload.user,
          };
        }
        return state;
      default:
        sayHeloToUser(initialState);
        return state;
    }
  }
  return state;
};
export default userReducer;
