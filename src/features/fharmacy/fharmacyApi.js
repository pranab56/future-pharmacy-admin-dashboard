import { baseApi } from "../../utils/apiBaseQuery";


export const fharmacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPharmacy: builder.query({
      query: () => ({
        url: "/pharmacies",
        method: "GET",
      }),
      providesTags: ["pharmacy"],
    }),
  }),
});

// Export hooks
export const {
  useGetAllPharmacyQuery
} = fharmacyApi;
