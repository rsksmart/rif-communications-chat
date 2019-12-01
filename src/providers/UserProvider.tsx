import React, { Component, createContext } from "react";

import User from "models/User";
import * as RifCommunications from "libs/RIFcomms";
import { create } from "peer-info";

export interface IUserProvider {
  state: {
    readonly user?: User;
  };
  actions: {
    createUser: () => Promise<void>;
    changeRNS: (rnsName: string) => Promise<void>;
  };
}

const { Provider, Consumer } = createContext<IUserProvider>({
  actions: {
    createUser: () => {
      return new Promise(resolve => resolve());
    },
    changeRNS: () => {
      return new Promise(resolve => resolve());
    }
  },
  state: {
    user: undefined
  }
});

interface IUserProviderProps {}
interface IUserProviderState {
  user?: User;
}

class UserProvider extends Component<IUserProviderProps, IUserProviderState> {
  constructor(props: object) {
    super(props);

    this.state = {};

    this.createUser = this.createUser.bind(this);
    this.changeRNS = this.changeRNS.bind(this);
  }

  public render() {
    const { user } = this.state;
    const { createUser, changeRNS } = this;

    return (
      <Provider
        value={{
          actions: {
            createUser,
            changeRNS
          },
          state: {
            user
          }
        }}
      >
        {this.props.children}
      </Provider>
    );
  }

  private async createUser() {
    const pid = await RifCommunications.createKey("hello");
    const pi = await create(pid);
    this.setState({ user: new User({ pi }) });
  }

  private async changeRNS(rnsName: string) {
    const { user } = this.state;
    if (user) {
      user.rnsName = rnsName;
      this.setState({ user });
    }
  }
}

export default { Consumer, Provider: UserProvider };
