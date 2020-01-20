import LocalStorage from 'utils/LocalStorage';
import Logger from 'utils/Logger';
import { addContact, UserAction, USER_ACTIONS } from './userActions';
import { initialState } from './UserStore';

const {
  RESTORE_USER,
  SET_CLIENT_NODE,
  LOGOUT,
  ADD_CONTACT,
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
} = USER_ACTIONS;

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
        state = {
          ...state,
          contacts: addContact(state, payload.contact),
        };
        break;
      case SEND_MESSAGE:
        payload.contact.chat.push(payload.message);
        state = {
          ...state,
          sentMsgs: state.sentMsgs + 1,
        };
        persistence.setItem('contacts', state.contacts);
        break;
      case RECEIVE_MESSAGE:
        let { contacts } = state;
        const { message, contact } = payload;
        const contactExists = !!contacts.find(
          contact => contact.peerInfo?.id?.publicKey === contact.publicKey,
        );
        const newContacts = [...contacts];
        if (!contactExists) {
          newContacts.push(contact);
          //TODO: DRY it (exists in userActions -> addContact)
          newContacts.sort((a, b) => {
            if (a.rnsName && !b.rnsName)
              return a.publicKey < b.publicKey ? -1 : 1;
            else if (!a.rnsName) return -1;
            else if (!b.rnsName) return 1; // FIXME: never reached as !(A&&!B) -> [[!A,!B], [!A,B], [A,B]]
            return a.rnsName < b.rnsName ? -1 : 1;
          });
          localStorage.setItem('contacts', JSON.stringify(contacts));
        }
        state = {
          ...state,
          contacts: newContacts,
        };
      case LOGOUT:
        state = initialState;
        break;
      default:
    }
  }
  return state;
};
export default userReducer;
