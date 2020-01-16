export enum MESSAGE_SENDER {
  ME,
  THEM,
}

export interface IMessageParams {
  sender?: MESSAGE_SENDER;
  content: string;
  timestamp: string;
}

export default class Message {
  sender: MESSAGE_SENDER;
  content: string;
  timestamp: string;

  constructor({ sender, content, timestamp }: IMessageParams) {
    this.sender = sender || MESSAGE_SENDER.ME;
    this.content = content;
    this.timestamp = timestamp;
  }
}
