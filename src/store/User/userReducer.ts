import { initialState } from './UserStore';
import UserActions, { USER_ACTIONS } from './userActions';

const userReducer = (state = initialState, action: { type: USER_ACTIONS }) => {
  const actions = new UserActions(state);
  switch (action.type) {
    //         case REGISTER_USER:
    //             console.log(
    //                 `%c {type: REGISTER_USER, registeredUser: ${JSON.stringify(
    //                     registeredUser)}}`, "color: yellow; font-weight: bold");
    //             return success ? { ...state, newUser: true }
    //                 : { ...state, errorMessage: message };

    //         case LOGIN_USER:
    //             console.log(`%c {type: LOGIN_USER, loggedInUser:
    //       ${JSON.stringify(loggedInUser)}}`, "color: teal; font-weight:
    //        bold");
    //  return success ? { ...state, currentUser: loggedInUser }
    //                 : { ...state, errorMessage: message }
    //         case LOGOUT_USER:
    //             console.log(
    //                 `%c {type: LOGOUT_USER, currentUser: {}} `,
    //                 "color: pink; font-weight: bold");
    //             return { ...state, currentUser: {} };
    default:
      actions.sayHeloToUser();
      return state;
  }
};
export default userReducer;
