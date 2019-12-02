import React, { Component, createContext } from "react";
import publicIp from "public-ip";

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

  async componentDidMount() {
    // connect to bootnode
    // timeout to reconnect when you get disconnected - every 30 seconds

    //Getting public IP address
    console.log(await publicIp.v4());
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
    const rnsName = localStorage.getItem("rns");
    this.setState({ user: new User({ pi, rnsName }) });
  }

  private async changeRNS(rnsName: string) {
    const { user } = this.state;
    if (user) {
      user.rnsName = rnsName;
      localStorage.setItem("rns", rnsName);
      this.setState({ user });
    }
  }
}

export default { Consumer, Provider: UserProvider };
