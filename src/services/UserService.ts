import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { hash as namehash } from 'eth-ens-namehash';

const TLD = '.comms19.rsk';
const BASE_ADD: string = process.env.REACT_APP_RNS_SERVER
  ? process.env.REACT_APP_RNS_SERVER
  : 'http://64.225.35.211:3010';
const API_ADD = BASE_ADD + '/api';

const RNS_MAINNET_API = `http://localhost:3001`;
const RSK_PUBLIC_NODE = `https://public-node.rsk.co`;

const STR_ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [
      { name: "node", type: "bytes32" }
    ],
    name: "str",
    outputs: [
      { name: "", type: "string" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
const STR_ADDRESS = '0x87c51c497830d42b88a9cb5a09873da48d856cf2';

const fetchUserByName = async (rnsName: string): Promise<string> => {
  const web3 = new Web3(RSK_PUBLIC_NODE);
  const strResolver = new web3.eth.Contract(STR_ABI, STR_ADDRESS);

  const domain = rnsName + TLD;
  const node = namehash(domain);

  return strResolver.methods.str(node).call();
};

const checkUserExists = async (rnsName: string) => {
  return new Promise((resolve, error) => {
    return fetch(`${RNS_MAINNET_API}/subdomainStatus?subdomain=${rnsName + TLD}`)
    .then(res => {
      if (res && res.body)
        return res.json();
    })
    .then(res => {
      if(res && res.status && res.status.status !== 'AVAILABLE')
        resolve(true);
      resolve(false);
    })
    .catch(error => resolve(error))
  });
};

const addUserName = async (
  rnsName: string,
  publicKey: string,
  address: string,
): Promise<{ domain: string; publicKey: string }> => {
  return new Promise((resolve, reject) => {
    fetch(`${RNS_MAINNET_API}/setSubdomainNode`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: rnsName + TLD,
        str: publicKey,
        address: address,
      }),
    })
      .then(response => response.json())
      .then(body => resolve(body))
      .catch(err => reject(err));
  });
};

export { fetchUserByName, checkUserExists, addUserName };
