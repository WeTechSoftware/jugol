import { IMessage } from 'react-native-gifted-chat';

import { createSlice } from '@reduxjs/toolkit';
import { IAddMessageAction, IAddSingleMessageAction, IMessageState, IRemoveMessageAction } from './messagesSlice.types';
import { RootState } from '../../index';

const initialState: IMessageState = {
    messages: [],
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessages: (state, action: IAddMessageAction) => {
            state.messages = action.payload;
        },
        addSingleMessage: (state, action: IAddSingleMessageAction) => {
            state.messages.push(action.payload);
        },
        removeMessage: (state, action: IRemoveMessageAction) => {
            const filteredMessage = state.messages.filter(message => message._id !== action.payload);
            state.messages = filteredMessage;
        }
    },
});

export const { addMessages, addSingleMessage, removeMessage } = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages;

const messageReducer = messagesSlice.reducer;

export default messageReducer;
