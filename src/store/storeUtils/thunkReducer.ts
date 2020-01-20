import {
  USER_ACTIONS,
  addUser,
  connectToNode,
  createUser,
  setupUser,
  checkUserExists,
  addMessage,
} from 'store/User/userActions';
import { IAction } from './IAction';
import LocalStorage from 'utils/LocalStorage';
import { fetchUserByName } from 'api/RIFNameService';
import { APP_ACTIONS } from 'store/App/appActions';
import Logger from 'utils/Logger';

const persistence = LocalStorage.getInstance();
const logger = Logger.getInstance();

const {
  ADD_USER,
  CHECK_RNS,
  CONNECT_TO_NODE,
  CREATE_USER,
  RESTORE_USER,
  LOGOUT,
  FETCH_RNS,
  SEND_MESSAGE,
} = USER_ACTIONS;

// FIXME: Thunk reducer should also process only those actions that require it.
// TODO: Perhaps it should be named better as it isn't really a react reducer. More of a pre-reducer function (thunk).
const thunkReducer = async (state, dispatch, action: IAction) => {
  logger.debug('thunkReducer -> action', action);
  const { type, payload } = action;
  const { clientNode } = state;
  const { user } = state;

  if (type) {
    switch (type) {
      case CONNECT_TO_NODE:
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: true, message: 'Connecting to node...' },
        });
        await connectToNode(clientNode);
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: false },
        });
        break;
      case CREATE_USER:
        await createUser(payload.rnsName, dispatch, action);
        break;
      case RESTORE_USER:
        await setupUser(payload.keystore, dispatch);
        break;
      case ADD_USER:
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: true, message: 'Adding user...' },
        });
        await addUser(user, dispatch, action);
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: false },
        });
        break;
      case CHECK_RNS:
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: true, message: 'Chcking RNS name...' },
        });
        checkUserExists(payload.rnsName).then(isExistingRns => {
          payload.errorsCb(isExistingRns);
        });
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: false },
        });
        break;
      case FETCH_RNS:
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: true, message: 'Fetching public key...' },
        });
        await fetchUserByName(payload.rnsName)
          .then(publicKey => {
            payload.setPublicKey(publicKey);
          })
          .catch(() => payload.setPublicKey());

        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: false },
        });
        break;
      case SEND_MESSAGE:
        const { message, contact } = payload;
        addMessage(state, message, contact);
        break;
      case LOGOUT:
        persistence.clear();
        break;
      default:
        return dispatch(action);
    }
  }
  return dispatch(action);
};
export default thunkReducer;
