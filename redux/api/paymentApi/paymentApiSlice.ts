import {apiSlice} from '../apiSlice';

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPayment: builder.mutation({
      query: (body) => ({
        url: `payment/createPayment`,
        method: 'POST',
        body,
      }),
    })
  }),
  overrideExisting: true,
});

export const {
    useCreatePaymentMutation,
} = paymentApiSlice;
