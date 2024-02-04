import { IConversationProps } from "@screens/message-screens/MessagesScreen/MessageScreen.types";

export interface IGetMessages {
  pageNumber: number;
  pageSize: number;
  id: string;
}

export interface IGetConversations {
  pageNumber: number;
  pageSize: number;
}

export interface MessageUser {
  _id: string;
  firstName: string;
  lastName: string;
  user: string;
  profilePic: string;
  isActive: boolean;
}

export interface IFileResponse {
  _id: string;
  fileType: string;
  fileUrl: string;
  format: string;
  resourceType: string;
}

export interface IMessageResponse {
  _id: string;
  sender: MessageUser;
  reciver: MessageUser;
  message: string;
  createdAt: string;
  updatedAt: string;
  files: IFileResponse[];
}

export interface IConversationResponse {
  data: IConversationProps[];
  totalConversations: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

export interface IMessageData {
  senderDetails: MessageUser;
  reciverDetails: MessageUser;
  messages: IMessageResponse[];
  pageSize: number;
  pageNumber: number;
  totalMessages: number;
  totalPages: number;
}

export interface IMessageDraft {
  data: IMessageData;
}
