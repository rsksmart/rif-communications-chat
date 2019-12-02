export enum MESSAGE_SENDER {
  ME,
  THEM
}

export interface IMessageParams {
  sender?: MESSAGE_SENDER;
  content: string;
}

export default class Message {
  sender: MESSAGE_SENDER;
  content: string;

  constructor({ sender, content }: IMessageParams) {
    this.sender = sender || MESSAGE_SENDER.ME;
    this.content = content;
  }
}
