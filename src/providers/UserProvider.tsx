import React, { Component, createContext } from "react";

import libp2p from "libp2p";
import * as RifCommunications from "libs/RIFcomms";
import User from "models/User";
import { PeerId } from "peer-id";
import { create, PeerInfo } from "peer-info";

export interface IUserProvider {
  state: {
    readonly user?: User;
    readonly clientNode?: libp2p;
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
    clientNode: undefined,
    user: undefined
  }
});

interface IUserProviderProps {}
interface IUserProviderState {
  user?: User;
  clientNode?: libp2p;
}

class UserProvider extends Component<IUserProviderProps, IUserProviderState> {
  constructor(props: object) {
    super(props);

    this.state = {};

    this.createUser = this.createUser.bind(this);
    this.changeRNS = this.changeRNS.bind(this);
  }

  public async componentDidMount() {
    await this.connectToNode();
    // timeout to reconnect when you get disconnected - every 30 seconds
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

  private async connectToNode() {
    if (this.state.clientNode) {
      const bootNodeAddr: string = process.env.REACT_APP_BOOTNODE_ADDR
        ? process.env.REACT_APP_BOOTNODE_ADDR
        : "putDefaultStringBootnodeHere";
      RifCommunications.connectToNode(this.state.clientNode, bootNodeAddr);
    }
  }

  private async createNode(user: User) {
    if (!this.state.clientNode) {
      return RifCommunications.createNode(user.pi, "127.0.0.1", 80);
    }
    return this.state.clientNode;
  }

  private async createUser() {
    const pid = await RifCommunications.createKey();
    const pi = await RifCommunications.createPeerInfo(pid);
    const rnsName = localStorage.getItem("rns");
    const user = new User({ pi, rnsName });
    const node: libp2p | undefined = await this.createNode(user);
    if (node) {
      await this.connectToNode();
      this.setState({
        clientNode: node,
        user
      });
    }
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
