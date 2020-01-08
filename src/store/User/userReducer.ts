import { initialState } from './UserStore';
import { USER_ACTIONS, sayHeloToUser, Action } from './userActions';

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_ACTIONS.CREATE_RNS:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    default:
      sayHeloToUser(initialState);
      return state;
  }
};
export default userReducer;
