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
        const { clientName } = state;
        await connectToNode(clientName);
      case CREATE_RNS:
        const { rnsName } = payload;
        await createUser(rnsName, dispatch);
        state = {
          ...state,
          user: { rnsName },
        };
        return dispatch(USER_ACTIONS.ADD_USER);
      case ADD_USER:
        const { user } = state;
        await addUser(user, dispatch, action);
      case CHECK_RNS:
        checkRns(payload.rnsName).then(isExistingRns => {
          payload.errorsCb(isExistingRns);
        });
      default:
        return dispatch(action);
    }
  }
  return dispatch(action);
};
export default thunkReducer;
