import { useReducer, useRef, useMemo, useEffect } from 'react';
import appReducer from 'store/App/appReducer';
import thunkReducer from './thunkReducer';

const LOGGING_ENABLED: boolean =
  !!process.env.REACT_APP_LOGGING && process.env.REACT_APP_LOGGING === 'true';

export default class Middleware {
  private static instance: Middleware;

  private constructor() {}

  public static getInstance(): Middleware {
    if (!Middleware.instance) {
      Middleware.instance = new Middleware();
    }
    return Middleware.instance;
  }

  // From: https://github.com/the-road-to-learn-react/use-combined-reducers/blob/master/src/index.js
  useCombinedReducers = combinedReducers => {
    // Global State
    const state = Object.keys(combinedReducers).reduce(
      (acc, key) => ({
        ...acc,
        [key]: combinedReducers[key][0],
      }),
      {},
    );

    // Global Dispatch Function
    const dispatch = action =>
      Object.keys(combinedReducers)
        .map(key => {
          return combinedReducers[key][1];
        })
        .forEach(fn => {
          fn(action);
        });

    return [state, dispatch];
  };

  useMiddleware = (stateName: string, reducer, initialState) => {
    let prevState = useRef(initialState);
    const [state, dispatch] = useReducer(reducer, initialState);

    const [appState, appDispatch] = useReducer(appReducer, {
      message: {},
    });

    const [combinedState, combinedDispatch] = this.useCombinedReducers({
      [stateName]: [state, dispatch],
      AppState: [appState, action => appDispatch(action)],
    });

    const dispatchWithMiddleware = useMemo(() => {
      const withMiddleware = dispatch => {
        return action => {
          // dispatchMessage({ type: MESSAGING_ACTIONS.SET_IS_LOADING });
          LOGGING_ENABLED && console.log('Action Type:', action.type);
          LOGGING_ENABLED && console.log('Action Payload:', action.payload);
          thunkReducer(state, dispatch, action);
        };
      };

      return withMiddleware(combinedDispatch);
    }, [combinedDispatch, state]);

    useEffect(() => {
      if (LOGGING_ENABLED) {
        if (combinedState !== initialState) {
          console.log('Prev state:', prevState.current);
          console.log('Next state:', combinedState);
        } else {
          console.log('No change:', combinedState);
        }
      }
      prevState.current = combinedState;
    }, [initialState, combinedState]);

    return [combinedState, dispatchWithMiddleware];
  };
}
