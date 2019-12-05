const TLD = '.rsk';
const BASE_ADD = 'http://64.225.35.211:3010';
const API_ADD = BASE_ADD + '/api';

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
  return new Promise((resolve, reject) => {
    fetch(`${API_ADD}/domain?domain=${rnsName + TLD}`)
      .then(res => resolve(res.status === 200))
      .catch(err => resolve(false));
  });
};

const addUserName = async (
  rnsName: string,
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
        publicKey: Math.floor(Math.random() * 10000000000).toString(36),
      }),
    })
      .then(response => response.json())
      .then(body => resolve(body))
      .catch(err => reject(err));
  });
};

export { fetchUserByName, checkUserExists, addUserName };
