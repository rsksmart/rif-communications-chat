import { initialState } from './UserStore';
import { USER_ACTIONS, UserAction, addContact } from './userActions';
import LocalStorage from 'utils/LocalStorage';
import Logger from 'utils/Logger';

const { RESTORE_USER, SET_CLIENT_NODE, LOGOUT, ADD_CONTACT } = USER_ACTIONS;

const persistence = LocalStorage.getInstance();
const logger = Logger.getInstance();

// FIXME: Reducer should to be able to tell whether the action is meant for it
const userReducer = (state = initialState, action: UserAction) => {
  logger.debug('userReducer -> action', action);

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
        persistence.setItem('rnsName', rnsName || '');
        break;
      case RESTORE_USER:
        state = {
          ...state,
          user: {
            ...payload.user,
          },
          contacts: persistence.getItem('contacts') || [],
        };
        break;
      case ADD_CONTACT:
        state = addContact(state, payload.contact);
        break;
      case LOGOUT:
        state = initialState;
        break;
      default:
    }
  }
  return state;
};
export default userReducer;
