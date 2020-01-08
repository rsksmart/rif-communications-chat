// import Contact from './Contact';
import { IUserState } from './UserStore';
import { addUserName } from 'api/RIFNameService';
import { APP_ACTIONS } from 'store/App/appActions';
import { User } from 'models';

export enum USER_ACTIONS {
  SAY_HELLO = 'SAY_HELLO',
  CREATE_RNS = 'CREATE_RNS',
  ERROR = 'ERROR',
  CHECK_RNS = 'CHECK_RNS',
}

export interface Action {
  type: USER_ACTIONS;
  payload?: User;
}

export const sayHeloToUser = (initialState: IUserState | any) => {
  const { user } = initialState;
  if (user) return `Hello ${user.rnsName}`;
};

export const getContact = () => (rnsName: string, state: IUserState) => {
  const { contacts } = state;
  const contact = contacts.find(c => c.rnsName === rnsName);
  return contact;
};

export const addUser = (
  new_user: { rnsName; publicKey },
  dispatch: any,
  action: any,
) => {
  const { rnsName, publicKey } = new_user;
  addUserName(rnsName, publicKey)
    .then(user => dispatch({ type: action.type, payload: user }))
    .catch(err => dispatch({ type: APP_ACTIONS.SET_ERROR, payload: err }));
};
