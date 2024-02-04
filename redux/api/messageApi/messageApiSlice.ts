import { BASE_URL } from '@config';
import io from 'socket.io-client';
import { IConversationProps } from '../../../src/screens/message-screens/MessagesScreen/MessageScreen.types';
import { RootState } from '../../index';
import { apiSlice } from '../apiSlice';
import {
  IConversationResponse,
  IGetConversations,
  IGetMessages,
  IMessageData,
  IMessageDraft,
  IMessageResponse,
} from './messageApiSlice.types';

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getConversations: builder.query({
      query: () => {
        return {
          url: 'messages/getConversations',
          method: 'GET',
        };
      },
      async onCacheEntryAdded(
        args,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getState },
      ) {
        try {
          const socket = io(BASE_URL);
          const state: RootState = getState();

          const userId = state?.auth?.uid;

          socket.on('sendMessage', async (message: IMessageResponse) => {
            try {
              const reciver = message?.reciver?._id;
              const sender = message?.sender?._id;
              const senderFirebaseId = message?.sender?.user;
              const reciverFirebaseId = message?.reciver?.user;
              const lastMessage = message?.message;
              const messageCreatedAt = message?.createdAt;
              const files = message?.files;
              const reciverIsActive = message?.reciver?.isActive;
              const senderIsActive = message?.sender?.isActive;

              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const isSenderAlreadyInTheConversation = draft?.data?.find(
                    data =>
                      data?.userID === sender && data?.currentUser === reciver,
                  );
                  const isReciverAlreadyInTheConversation = draft?.data?.find(
                    data =>
                      data?.userID === reciver && data?.currentUser === sender,
                  );

                  if (isReciverAlreadyInTheConversation) {
                    isReciverAlreadyInTheConversation.lastMessage = lastMessage;
                    isReciverAlreadyInTheConversation.createdAt =
                      messageCreatedAt;
                    isReciverAlreadyInTheConversation.files = files;
                    isReciverAlreadyInTheConversation.isActive = reciverIsActive;
                  }
                  if (isSenderAlreadyInTheConversation) {
                    isSenderAlreadyInTheConversation.lastMessage = lastMessage;
                    isSenderAlreadyInTheConversation.createdAt =
                      messageCreatedAt;
                    isSenderAlreadyInTheConversation.files = files;
                    isSenderAlreadyInTheConversation.isActive = senderIsActive;
                  }

                  if (
                    !isReciverAlreadyInTheConversation &&
                    !isSenderAlreadyInTheConversation
                  ) {
                    if (
                      message?.sender?.user === userId ||
                      message?.reciver?.user === userId
                    ) {
                      const nextUser =
                        message?.sender?.user === userId
                          ? message?.reciver
                          : message?.sender;
                      const currentUser =
                        message?.sender?.user !== userId
                          ? message?.reciver
                          : message?.sender;
                      const newConversation: IConversationProps = {
                        profilePic: nextUser.profilePic,
                        createdAt: messageCreatedAt,
                        lastMessage,
                        userID: nextUser?._id,
                        currentUser: currentUser?._id,
                        name: nextUser?.firstName + ' ' + nextUser?.lastName,
                        firebaseID: nextUser?.user,
                        unread: 0,
                        updatedAt: message?.updatedAt,
                        files: message?.files,
                        isActive: nextUser?.isActive,
                      };
                      draft?.data?.push(newConversation);
                    }
                  }
                } else {
                  console.warn('draft is undefined');
                }
              });
            } catch (error) {
              console.error(error);
            }
          });

          socket.on('addBlockedUser', async blockedData => {
            try {
              const user1DatabaseId = blockedData.blocker;
              const user2DatabaseId = blockedData.blocked;

              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const condition1 = draft.data.filter(
                    data =>
                      data.currentUser === user1DatabaseId &&
                      data.userID === user2DatabaseId,
                  );
                  const condition2 = draft.data.filter(
                    data =>
                      data.currentUser === user2DatabaseId &&
                      data.userID === user1DatabaseId,
                  );

                  if (condition2.length > 0) {
                    condition2[0].blockedBySomeone = true;
                    condition2[0].blockedByYou = false;
                    condition2[0].isBlocked = true;
                  }

                  if (condition1.length > 0) {
                    condition1[0].blockedBySomeone = false;
                    condition1[0].blockedByYou = true;
                    condition1[0].isBlocked = true;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          socket.on('removeBlockedUser', async blockedData => {
            try {
              const user1DatabaseId = blockedData.unblocker;
              const user2DatabaseId = blockedData.unblocked;
              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const condition1 = draft.data.filter(
                    data =>
                      data.currentUser === user1DatabaseId &&
                      data.userID === user2DatabaseId,
                  );
                  const condition2 = draft.data.filter(
                    data =>
                      data.currentUser === user2DatabaseId &&
                      data.userID === user1DatabaseId,
                  );

                  if (condition2.length > 0) {
                    condition2[0].blockedBySomeone = false;
                    condition2[0].blockedByYou = false;
                    condition2[0].isBlocked = false;
                  }

                  if (condition1.length > 0) {
                    condition1[0].blockedBySomeone = false;
                    condition1[0].blockedByYou = false;
                    condition1[0].isBlocked = false;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          socket.on('deleteConversation', async data => {
            try {
              const user1 = data?.user1;
              const user2 = data?.user2;
              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const isSenderAlreadyInTheConversation = draft?.data?.find(
                    data =>
                      data?.userID === user1 && data?.currentUser === user2,
                  );
                  const isReciverAlreadyInTheConversation = draft?.data?.find(
                    data =>
                      data?.userID === user2 && data?.currentUser === user1,
                  );

                  if (isReciverAlreadyInTheConversation) {
                    const newConv = draft?.data?.filter(
                      convData =>
                        convData?.currentUser !==
                        isReciverAlreadyInTheConversation?.currentUser ||
                        convData?.userID !==
                        isReciverAlreadyInTheConversation?.userID,
                    );
                    const newConversation = {
                      data: newConv,
                      totalConversations: draft?.totalConversations,
                      totalPages: draft?.totalPages,
                      pageNumber: draft?.pageNumber,
                      pageSize: draft?.pageSize,
                    };
                    return newConversation;
                  }

                  if (isSenderAlreadyInTheConversation) {
                    const newConv = draft?.data?.filter(
                      convData =>
                        convData?.userID !==
                        isSenderAlreadyInTheConversation?.userID ||
                        convData?.currentUser !==
                        isSenderAlreadyInTheConversation?.currentUser,
                    );
                    const newConversation = {
                      data: newConv,
                      totalConversations: draft?.totalConversations,
                      totalPages: draft?.totalPages,
                      pageNumber: draft?.pageNumber,
                      pageSize: draft?.pageSize,
                    };
                    return newConversation;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          socket.on('activeUsers', async (data) => {
            try {
              const parseData = JSON.parse(data);

              const nextUserUID = parseData.user;

              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {
                  const condition1 = draft.data.filter(
                    data =>
                      data.firebaseID === nextUserUID || data.currentUserFirebaseId === nextUserUID
                  );

                  if (condition1.length > 0) {
                    condition1[0].isActive = parseData.isActive;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          socket.on('inactiveUsers', async (data) => {
            try {
              const parseData = JSON.parse(data);

              const nextUserUID = parseData.user;

              updateCachedData((draft: IConversationResponse) => {
                if (draft?.data) {

                  const condition1 = draft.data.filter(
                    data =>
                      data.firebaseID === nextUserUID
                  );

                  if (condition1.length > 0) {
                    condition1[0].isActive = parseData.isActive;
                  }
                }
              });
            } catch (error) {
              console.log(error);
            }
          });

          await cacheEntryRemoved;
          socket.close();
        } catch (error) {
          console.error(error);
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
    }),
    getInfiniteConversations: builder.query({
      query: (data: IGetConversations) => {
        let queryParams =
          data?.pageNumber && data?.pageSize
            ? `?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`
            : '';
        const url = `messages/getConversations${queryParams}`;
        return {
          url,
          method: 'GET',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.data?.length > 0) {
            dispatch(
              messageApiSlice.util.updateQueryData(
                'getConversations',
                undefined,
                (draft: IConversationResponse) => {
                  const draftData = draft?.data?.map(d => d);
                  const resultData = result?.data?.data?.map(d => d);
                  const newData = {
                    ...draft,
                    pageNumber: result?.data?.pageNumber,
                    data: [...draftData, ...resultData],
                  };
                  return newData;
                },
              ),
            );
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),
    getMessage: builder.query({
      query: id => {
        return {
          url: `messages/getMessage/${id}`,
          method: 'GET',
        };
      },
      async onCacheEntryAdded(
        args,
        {
          cacheDataLoaded,
          cacheEntryRemoved,
          updateCachedData,
          getState,
          dispatch,
        },
      ) {
        try {
          const socket = io(BASE_URL);
          const state: RootState = getState();

          const userId = state?.auth?.uid;

          socket.on('sendMessage', message => {
            try {
              if (
                message?.sender?.user === userId ||
                message?.reciver?.user === userId
              ) {
                updateCachedData(draft => {
                  draft?.data?.messages?.push(message);
                });
              }
            } catch (error) {
              console.error(error);
            }
          });
          // });
          await cacheEntryRemoved;
          socket.close();
        } catch (error) {
          console.error(error);
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
      },
    }),
    getInfiniteMessage: builder.query({
      query: (data: IGetMessages) => {
        let queryParams =
          data?.pageNumber && data?.pageSize
            ? `?pageSize=${data?.pageSize}&pageNumber=${data?.pageNumber}`
            : '';
        return {
          url: `messages/getMessage/${data.id}${queryParams}`,
          method: 'GET',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.data?.messages?.length > 0) {
            dispatch(
              messageApiSlice.util.updateQueryData(
                'getMessage',
                args.id.toString(),
                (draft: IMessageDraft) => {
                  const draftData = draft?.data?.messages?.map(d => d);
                  const resultData = result?.data?.data?.messages?.map(d => d);
                  const newData = {
                    ...draft?.data,
                    pageNumber: result?.data?.data?.pageNumber,
                    messages: [...draftData, ...resultData],
                  };
                  const newDraft = {
                    data: newData,
                  };
                  return newDraft;
                },
              ),
            );
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),

    sendMessage: builder.mutation({
      query: data => ({
        method: 'POST',
        url: '/messages/sendMessage',
        body: data,
      }),
    }),

    callUser: builder.mutation({
      query: data => ({
        method: 'POST',
        url: '/messages/callUser',
        body: data,
      }),
    }),

    deleteConversation: builder.mutation({
      query: reciverID => ({
        method: 'DELETE',
        url: `/messages/deleteConversation/${reciverID}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetConversationsQuery,
  useGetMessageQuery,
  useSendMessageMutation,
  useCallUserMutation,
  useGetInfiniteConversationsQuery,
  useGetInfiniteMessageQuery,
  useDeleteConversationMutation,
} = messageApiSlice;
