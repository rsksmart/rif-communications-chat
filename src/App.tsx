import React from "react";
import { Router } from "react-router-dom";

import UserProvider from "providers/UserProvider";
import ChatProvider from "providers/ChatProvider";
import Routes from "views/Routes";
import Header from "components/Header";
// import Footer from "components/Footer";
import { history } from "routes";

const App: React.FC = () => {
  return (
    <UserProvider.Provider>
      <ChatProvider.Provider>
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
      </ChatProvider.Provider>
    </UserProvider.Provider>
  );
};

export default App;
