import { initialState, IUserState } from './UserStore';
import { USER_ACTIONS, UserAction, addContact } from './userActions';
import LocalStorage from 'api/LocalStorage';

const { SETUP_USER, SET_CLIENT_NODE, LOGOUT, ADD_CONTACT } = USER_ACTIONS;

const persistence = LocalStorage.getInstance();

// FIXME: Reducer should to be able to tell whether the action is meant for it
const userReducer = (state = initialState, action: UserAction) => {
  console.log('TCL: userReducer -> action', action);
  const { type, payload } = action;
  let newState: IUserState = { ...state };

  if (type) {
    switch (type) {
      case SET_CLIENT_NODE:
        newState = {
          ...payload,
        };
        const { user } = newState;
        const rnsName = user && user.rnsName;
        persistence.setItem('rnsName', rnsName || '');
        break;
      case SETUP_USER:
        newState = {
          user: {
            ...payload.user,
          },
          contacts: persistence.getItem('contacts') || [],
        };
        break;
      case ADD_CONTACT:
        newState = addContact(state, payload.contact);
        break;
      case LOGOUT:
        newState = initialState;
        break;
      default:
    }
  }
  return newState;
};
export default userReducer;
