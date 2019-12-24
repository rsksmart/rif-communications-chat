import { initialState } from './UserStore';
import UserActions, { USER_ACTIONS } from './userActions';

const userReducer = (state = initialState, action: { type: USER_ACTIONS }) => {
  const actions = new UserActions(state);
  switch (action.type) {
    default:
      actions.sayHeloToUser();
      return state;
  }
};
export default userReducer;
