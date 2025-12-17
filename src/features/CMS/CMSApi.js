import { baseApi } from "../../utils/apiBaseQuery";


export const CMSApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createCMS: builder.mutation({
      query: (data) => ({
        url: '/setting',
        method: 'PATCH',
        body: Object.fromEntries(
          Object.entries(data).filter(([_, value]) => value)
        ),
      }),
    }),

    getCMS: builder.query({
      query: () => ({
        url: '/setting',
        method: 'GET',
      }),
    }),

  }),
});

// Export hooks
export const {

  useCreateCMSMutation,
  useGetCMSQuery

} = CMSApi;
