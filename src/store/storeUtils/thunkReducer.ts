import {
  USER_ACTIONS,
  addUser,
  connectToNode,
  createUser,
  setupUser,
  checkUserExists,
} from 'store/User/userActions';
import { IAction } from './IAction';
import LocalStorage from 'api/LocalStorage';
import { fetchUserByName } from 'api/RIFNameService';
import { APP_ACTIONS } from 'store/App/appActions';
const localStorage = LocalStorage.getInstance();

const {
  ADD_USER,
  CHECK_RNS,
  CONNECT_TO_NODE,
  CREATE_USER,
  SETUP_USER,
  LOGOUT,
  FETCH_RNS,
} = USER_ACTIONS;

// FIXME: Thunk reducer should also process only those actions that require it.
// TODO: Perhaps it should be named better as it isn't really a react reducer. More of a pre-reducer function (thunk).
const thunkReducer = async (state, dispatch, action: IAction) => {
  console.log('TCL: thunkReducer -> action', action);
  const { type, payload } = action;

  if (type) {
    switch (type) {
      case CONNECT_TO_NODE:
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: true, message: 'Connecting to node...' },
        });
        const { clientNode } = state;
        await connectToNode(clientNode);
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: false },
        });
        break;
      case CREATE_USER:
        await createUser(payload.rnsName, dispatch, action);
        break;
      case SETUP_USER:
        await setupUser(payload.keystore, dispatch);
        break;
      case ADD_USER:
        dispatch({
          type: APP_ACTIONS.SET_IS_LOADING,
          payload: { isLoading: true, message: 'Adding user...' },
        });
        const { user } = state;
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
      case LOGOUT:
        localStorage.clear();
        break;
      default:
        return dispatch(action);
    }
  }
  return dispatch(action);
};
export default thunkReducer;
