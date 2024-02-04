import { apiSlice } from '../apiSlice';

export const blockApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addBlock: builder.mutation({
            query: (body) => ({
                url: 'block/addBlock',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['getAllBlocks'],
        }),
        getAllBlock: builder.query({
            query: () => ({
                url: 'block/getAllBlock',
                method: 'GET',
            }),
            providesTags: ['getAllBlocks'],
        }),
        deleteBlock: builder.mutation({
            query: (body) => ({
                url: 'block/deleteBlock',
                method: 'DELETE',
                body: body
            }),
            invalidatesTags: ['getAllBlocks'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useAddBlockMutation,
    useGetAllBlockQuery,
    useDeleteBlockMutation
} = blockApiSlice;
