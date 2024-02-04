import { apiSlice } from '../apiSlice';
import { ICallInfo, ITokenInfo } from './callApiSlice.types';

export const callApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        acceptCall: builder.query({
            query: ({ callChannelId, sender, reciver }: ICallInfo) => ({
                url: `/messages/acceptCall?callChannelId=${callChannelId}&sender=${sender}&reciver=${reciver}`,
                method: 'GET',
            })
        }),
        getRTCToken: builder.query({
            query: ({ channelName, role, tokentype, uid }: ITokenInfo) => ({
                url: `/messages/getRTCToken?channelName=${channelName}&role=${role}&tokentype=${tokentype}&uid=${uid}`,
                method: 'GET',
            })
        }),
        rejectCall: builder.mutation({
            query: body => ({
                url: '/messages/rejectCall',
                method: 'POST',
                body: body
            })
        }),
        endCall: builder.mutation({
            query: body => ({
                url: '/messages/endCall',
                method: 'POST',
                body: body
            })
        }),
    }),
    overrideExisting: true,
});

export const {
    useAcceptCallQuery,
    useEndCallMutation,
    useRejectCallMutation,
    useGetRTCTokenQuery
} = callApiSlice;
