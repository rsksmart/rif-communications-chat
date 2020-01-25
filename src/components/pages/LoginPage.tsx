import LoginPageTemplate from "components/templates/LoginPageTemplate";
import React, { FC, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import UserStore from "store/User/UserStore";
import { recoverUser } from "store/User/userUtils";
import LocalStorage from "utils/LocalStorage";
import { ROUTES } from "routes";
import { APP_ACTIONS } from "store/App/appActions";

// import Logger from 'utils/Logger';

export interface LoginPageProps {}

const persistence = LocalStorage.getInstance();

const LoginPage: FC<LoginPageProps> = () => {
  const { state, dispatch } = useContext(UserStore);
  const {
    UserState: { user }
  } = state;

  const [isRecovering, setIsRecovering] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const keystore = persistence.getItem("keystore");
    const rnsName = user && user.rnsName;

    if (!isRecovering && !rnsName && keystore) {
      setIsRecovering(true);
      const contacts = persistence.getItem("contacts");
      recoverUser({ keystore, contacts }, dispatch, () => {
        setIsRecovering(false);
      });
      dispatch({
        type: APP_ACTIONS.SET_IS_LOADING,
        payload: { isLoading: false }
      });
    }
  }, [isRecovering, user, dispatch]);

  useEffect(() => {
    const keystore = persistence.getItem("keystore");
    const rnsName = user && user.rnsName;

    if (!isRecovering && rnsName && keystore) {
      const backTo = location.state && location.state["backTo"];
      history.replace(backTo || ROUTES.PROFILE);
    }
  }, [history, location, user, isRecovering]);

  return <LoginPageTemplate isRecovering={isRecovering} />;
};

export default LoginPage;
