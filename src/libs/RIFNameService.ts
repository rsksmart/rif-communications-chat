const TLD = '.rsk';
const BASE_ADD: string = process.env.REACT_APP_RNS_SERVER
  ? process.env.REACT_APP_RNS_SERVER
  : 'http://64.225.35.211:3010';
const API_ADD = BASE_ADD + '/api';

export const fetchUserByName = async (rnsName: string): Promise<string> => {
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
