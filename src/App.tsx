import React from "react";
import { Router } from "react-router-dom";

import UserProvider from "providers/UserProvider";
import Routes from "views/Routes";
import Header from "components/Header";
// import Footer from "components/Footer";
import { history } from "routes";

console.log(process.env.REACT_APP_RNS_SERVER);

const App: React.FC = () => {
  return (
    <UserProvider.Provider>
      <Router history={history}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Header />

          {/* Content of the dapp*/}
          <div style={{ paddingTop: "1em" }}>
            <Routes />
          </div>
          <div style={{ flexGrow: 1 }} />

          {/*<Footer />*/}
        </div>
      </Router>
    </UserProvider.Provider>
  );
};

export default App;
