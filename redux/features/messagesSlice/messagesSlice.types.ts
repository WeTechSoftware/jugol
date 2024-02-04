import { IMessage } from 'react-native-gifted-chat';
export interface IMessageState {
    messages: IMessage[];
}

export interface IAddMessageAction {
    type: string;
    payload: IMessage[];
}

export interface IRemoveMessageAction {
    type: string;
    payload: string;
}

export interface IAddSingleMessageAction {
    type: string;
    payload: IMessage;
}