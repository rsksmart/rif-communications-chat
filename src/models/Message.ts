export enum MESSAGE_SENDER {
  ME,
  THEM,
}

export interface IMessageParams {
  sender?: MESSAGE_SENDER;
  content: string;
  timestamp: number;
}

export default class Message {
  public sender: MESSAGE_SENDER;
  public content: string;
  public timestamp: number;

  constructor({ sender, content, timestamp }: IMessageParams) {
    this.sender = sender || MESSAGE_SENDER.ME;
    this.content = content;
    this.timestamp = timestamp;
  }
}
