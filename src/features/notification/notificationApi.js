import { baseApi } from "../../utils/apiBaseQuery";


export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: "/notification/admin-all",
        method: "GET",
      }),
    }),

    getSingleNotification: builder.query({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "GET",
      }),
    }),


    singleReadNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/read/${id}`,
        method: "PATCH",
      }),
    }),



    allReadNotification: builder.mutation({
      query: () => ({
        url: `/notification/all-read`,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetAllNotificationQuery,
  useGetSingleNotificationQuery,
  useSingleReadNotificationMutation,
  useAllReadNotificationMutation
} = notificationApi;
