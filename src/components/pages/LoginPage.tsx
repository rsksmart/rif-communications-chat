import LoginPageTemplate from 'components/templates/LoginPageTemplate';
import { Contact, Message } from 'models';
import { IContactParams } from 'models/Contact';
import React, { FC, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { APP_ACTIONS } from 'store/App/appActions';
import { USER_ACTIONS } from 'store/User/userActions';
import { setupUser } from 'store/User/userController';
import UserStore from 'store/User/UserStore';
import LocalStorage from 'utils/LocalStorage';
import { PeerId } from 'peer-id';

// import Logger from 'utils/Logger';

export interface LoginPageProps {}

const persistence = LocalStorage.getInstance();

const LoginPage: FC<LoginPageProps> = () => {
  const { state, dispatch } = useContext(UserStore);
  const {
    UserState: { user },
    AppState: { isLoading },
  } = state;

  const history = useHistory();

  useEffect(() => {
    const keystore = persistence.getItem('keystore');
    const rnsName = user && user.rnsName;

    if (!isLoading && !rnsName && keystore) {
      const contacts = persistence.getItem('contacts');
      recoverUser({ keystore, contacts }, dispatch);
    }
    if (rnsName && keystore) {
      history.goBack();
    }
  }, [isLoading, user, dispatch, history]);

  return <LoginPageTemplate user={user} />;
};

export default LoginPage;

// TODO: not sure where to put this
export interface IUserRecData {
  keystore: PeerId;
  contacts: Contact[];
}
export const recoverUser = async (userRecData: IUserRecData, dispatch: any) => {
  const { keystore, contacts } = userRecData;
  try {
    const payload = await setupUser(
      keystore,
      (msg: { contact: Contact; message: Message }) => {
        dispatch({
          type: USER_ACTIONS.RECEIVE_MESSAGE,
          payload: msg,
        });
      },
    );
    dispatch({ type: USER_ACTIONS.SET_CLIENT, payload });
    const newContacts = contacts
      ? await Promise.all(
          contacts.map((contact: IContactParams) => Contact.new(contact)),
        )
      : [];
    dispatch({
      type: USER_ACTIONS.SET_CONTACTS,
      payload: {
        contacts: newContacts,
      },
    });
  } catch (err) {
    return { type: APP_ACTIONS.SET_ERROR, payload: err };
  }
};
