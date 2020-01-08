import { initialState } from './UserStore';
import { USER_ACTIONS, sayHeloToUser } from './userActions';

const userReducer = (state = initialState, action: { type: USER_ACTIONS }) => {
  switch (action.type) {
    case USER_ACTIONS.ADD_USER:
      state = {
        ...state,
        user: {
          rnsName: 'EXISTING ONE',
          pi: 'EXISTING ONE',
          publicKey: 'EXISTING ONE',
        },
      };
      break;
    default:
      sayHeloToUser(initialState);
      return state;
  }
};
export default userReducer;
