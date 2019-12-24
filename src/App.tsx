import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserStoreProvider } from 'store/User/UserStore';
// import UserProvider from 'providers/UserProvider';
import Routes from 'components/Routes';
import Header from 'components/organisms/Header';
// import Footer from "components/Footer";

console.log(process.env.REACT_APP_RNS_SERVER);

const App = () => {
  return (
    // <UserProvider.Provider>
    <UserStoreProvider>
      <Router>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />

          {/* Content of the dapp*/}
          <div style={{ paddingTop: '1em' }}>
            <Routes />
          </div>
          <div style={{ flexGrow: 1 }} />

          {/*<Footer />*/}
        </div>
      </Router>
    </UserStoreProvider>
    // </UserProvider.Provider>
  );
};

export default App;
