const TLD = '.comms19.rsk';
const BASE_ADD: string = process.env.REACT_APP_RNS_SERVER
  ? process.env.REACT_APP_RNS_SERVER
  : 'http://64.225.35.211:3010';
const API_ADD = BASE_ADD + '/api';

const RNS_MAINNET_API = process.env.RNS_MAINNET_API;

const fetchUserByName = async (rnsName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_ADD}/domain?domain=${rnsName + TLD}`)
      .then(response => {
        if (response.status === 404) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(body => {
        resolve(body);
      })
      .catch(err => reject(err));
  });
};

const checkUserExists = async (rnsName: string) => {
  return new Promise((resolve, error) => {
    return fetch(`${RNS_MAINNET_API}/subdomainStatus?subdomain=${rnsName + TLD}`)
    .then(res => {
      if (res && res.body)
        return res.json();
      resolve(true);
    })
    .then(res => {
      if(res && res.status && res.status.status !== 'AVAILABLE')
        resolve(true);
      resolve(false);
    })
    .catch(() => resolve(true))
  });
};

const addUserName = async (
  rnsName: string,
  publicKey: string,
): Promise<{ domain: string; publicKey: string }> => {
  return new Promise((resolve, reject) => {
    fetch(`${API_ADD}/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: rnsName + TLD,
        publicKey,
      }),
    })
      .then(response => response.json())
      .then(body => resolve(body))
      .catch(err => reject(err));
  });
};

export { fetchUserByName, checkUserExists, addUserName };
