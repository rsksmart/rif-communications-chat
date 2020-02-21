export interface IAction<T> {
  readonly type: string
  readonly payload: T
}

export interface IActionPayload { }