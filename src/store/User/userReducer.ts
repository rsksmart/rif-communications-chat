import { initialState } from './UserStore';
import { USER_ACTIONS, sayHeloToUser, IUserAction } from './userActions';

const { CREATE_RNS, SET_CLIENT_NODE } = USER_ACTIONS;

// FIXME: Reducer should to be able to tell whether the action is meant for it
const userReducer = (state = initialState, action: IUserAction) => {
  console.log('TCL: userReducer -> action', action);
  const { type, payload } = action;

  if (type) {
    switch (type) {
      case SET_CLIENT_NODE:
        if (payload && payload.clientNode && payload.user) {
          state = {
            ...state,
            clientNode: payload.clientNode,
            user: payload.user,
          };
        }
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
};
export default userReducer;
