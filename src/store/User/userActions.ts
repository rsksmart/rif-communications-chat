// import Contact from './Contact';
import { IUserState } from './UserStore';

export enum USER_ACTIONS {
  SAY_HELLO = 'sayHeloToUser',
}

export interface Actions {
  type: USER_ACTIONS;
}

export default class UserActions {
  state: IUserState;
  constructor(state: IUserState) {
    this.state = state;
  }

  public sayHeloToUser = () => {
    const { user } = this.state;
    if (user) return `Hello ${user.rnsName}`;
  };

  public static getContact = () => (rnsName: string, state: IUserState) => {
    const { contacts } = state;
    const contact = contacts.find(c => c.rnsName === rnsName);
    return contact;
  };
}
