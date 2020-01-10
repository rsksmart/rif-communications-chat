import {
  USER_ACTIONS,
  addUser,
  connectToNode,
  createRns,
} from 'store/User/userActions';
import { IAction } from './IAction';

const { CONNECT_TO_NODE, CREATE_RNS, CHECK_RNS } = USER_ACTIONS;

// FIXME: Thunk reducer should also process only those actions that require it.
const thunkReducer = async (state, dispatch, action: IAction) => {
  console.log('TCL: thunkReducer -> action', action);
  const { type, payload } = action;

  if (type) {
    switch (type) {
      case CONNECT_TO_NODE:
        await connectToNode(state);
      case CREATE_RNS:
        createRns(payload, state, dispatch);
        // const { new_user } = initialState;
        // if (new_user) addUser(initialState, dispatch, action);
        addUser(
          { rnsName: 'fancyname', publicKey: '324453' },
          dispatch,
          action,
        );
      case CHECK_RNS:
        if (payload && payload.user && payload.user.rnsName) {
        }
      default:
        return dispatch(action);
    }
  }
};
export default thunkReducer;
