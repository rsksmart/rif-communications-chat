import {
  USER_ACTIONS,
  addUser,
  connectToNode,
  createUser,
  setupUser,
  checkRns,
} from 'store/User/userActions';
import { IAction } from './IAction';
import LocalStorage from 'api/LocalStorage';
const localStorage = LocalStorage.getInstance();

const {
  ADD_USER,
  CHECK_RNS,
  CONNECT_TO_NODE,
  CREATE_USER,
  SETUP_USER,
  LOGOUT,
} = USER_ACTIONS;

// FIXME: Thunk reducer should also process only those actions that require it.
// TODO: Perhaps it should be named better as it isn't really a react reducer. More of a pre-reducer function (thunk).
const thunkReducer = async (state, dispatch, action: IAction) => {
  console.log('TCL: thunkReducer -> action', action);
  const { type, payload } = action;

  if (type) {
    switch (type) {
      case CONNECT_TO_NODE:
        const { clientNode } = state;
        await connectToNode(clientNode);
        break;
      case CREATE_USER:
        await createUser(payload.rnsName, dispatch, action);
        break;
      case SETUP_USER:
        await setupUser(payload.keystore, dispatch);
        break;
      case ADD_USER:
        const { user } = state;
        await addUser(user, dispatch, action);
        break;
      case CHECK_RNS:
        checkRns(payload.rnsName).then(isExistingRns => {
          payload.errorsCb(isExistingRns);
        });
        break;
      case LOGOUT:
        localStorage.clear();
      default:
        return dispatch(action);
    }
  }
  return dispatch(action);
};
export default thunkReducer;
