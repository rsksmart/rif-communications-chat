import {
  USER_ACTIONS,
  addUser,
  connectToNode,
  createRns,
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
        await connectToNode(state);
      case CREATE_RNS:
        const { rnsName } = payload;
        await createRns(rnsName, state, dispatch);
        state = {
          ...state,
          user: { rnsName },
        };
        return dispatch(USER_ACTIONS.ADD_USER);
      case ADD_USER:
        const { user } = state;
        await addUser(user, dispatch, action);

      case CHECK_RNS:
        if (payload && payload.user && payload.user.rnsName) {
        }
      default:
      // return dispatch(action);
    }
  }
  return state;
};
export default thunkReducer;
