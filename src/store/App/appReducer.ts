import { AppAction, AppPayload, ILoadingPayload, IMessagePayload } from 'store/App/appActions'
import Logger from 'utils/Logger'
import { APP_ACTIONS } from './appActions'
import { IAppMessage, IAppState, initialState } from './AppStore'

const logger = Logger.getInstance()

const appReducer = (state = initialState, action: AppAction) => {
  const { type, payload } = action
  const appAction = appActions[type]
  if (!!appAction) logger.debug('appReducer -> action', action)
  const newState = (!!appAction && appAction(state, payload)) || state

  return newState
}
export default appReducer

type IAppActions = {
  [key in APP_ACTIONS]: (state: IAppState, payload: AppPayload) => IAppState
}

const {
  SET_IS_LOADING,
  SET_MESSAGE,
  UNSET,
} = APP_ACTIONS

const appActions: IAppActions = {
  [SET_IS_LOADING]: (state, payload: ILoadingPayload) => {
    const { isLoading, message } = payload
    return {
      ...state,
      message: {
        isLoading,
        message,
      },
    }
  },
  [SET_MESSAGE]: (state, payload: IMessagePayload) => {
    const appMessage: IAppMessage = payload
    return {
      ...state,
      message: appMessage,
    }
  },
  [UNSET]: (state, _payload) => state,
}
