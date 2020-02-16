export enum MESSAGE_SENDER {
  ME,
  THEM,
}

export interface IMessageParams {
  sender?: MESSAGE_SENDER
  content: string
  timestamp: number
  isSync?: boolean
}

export default class Message {
  public sender: MESSAGE_SENDER
  public content: string
  public timestamp: number
  public isSync: boolean

  constructor({ sender, content, timestamp, isSync }: IMessageParams) {
    this.sender = sender || MESSAGE_SENDER.ME
    this.content = content
    this.timestamp = timestamp
    this.isSync = isSync || false
  }
}
