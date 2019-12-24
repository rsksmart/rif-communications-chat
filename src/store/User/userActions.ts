// import Contact from './Contact';
import { IUseState } from './UserStore';

export enum USER_ACTIONS {
  SAY_HELLO = 'sayHeloToUser',
}

export interface Actions {
  type: USER_ACTIONS;
}

export default class UserActions {
  state: IUseState;
  constructor(state: IUseState) {
    this.state = state;
  }

  public sayHeloToUser = () => {
    const { user } = this.state;
    if (user) return `Hello ${user.rnsName}`;
  };
}
