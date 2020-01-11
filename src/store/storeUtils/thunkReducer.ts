import {
  USER_ACTIONS,
  addUser,
  connectToNode,
  createUser,
  checkRns,
} from 'store/User/userActions';
import { IAction } from './IAction';

const { ADD_USER, CHECK_RNS, CONNECT_TO_NODE, CREATE_RNS } = USER_ACTIONS;

// FIXME: Thunk reducer should also process only those actions that require it.
const thunkReducer = async (state, dispatch, action: IAction) => {
  console.log('TCL: thunkReducer -> action', action);
  const { type, payload } = action;

  if (type) {
    switch (type) {
      case CONNECT_TO_NODE:
        const { clientNode } = state;
        await connectToNode(clientNode);
        break;
      case CREATE_RNS:
        const { rnsName } = payload;
        await createUser(rnsName, dispatch, action);
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
      default:
        return dispatch(action);
    }
  }
  return dispatch(action);
};
export default thunkReducer;
