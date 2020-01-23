import { Contact, Message } from 'models';
import { IContactParams } from 'models/Contact';
import { PeerId } from 'peer-id';
import { APP_ACTIONS } from 'store/App/appActions';
import { USER_ACTIONS } from './userActions';
import { setupUser } from './userController';

export interface IUserRecData {
  keystore: PeerId;
  contacts: Contact[];
}
export const recoverUser = async (userRecData: IUserRecData, dispatch: any) => {
  const { keystore, contacts } = userRecData;
  try {
    const payload = await setupUser(
      keystore,
      (payload: { contact: Contact; message: Message }) => {
        dispatch({
          type: USER_ACTIONS.RECEIVE_MESSAGE,
          payload,
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