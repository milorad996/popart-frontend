import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    fetchListings() { },
    fetchCategories() { },
    createListing() { },
    deleteListing() { },
    fetchListing() { },
    updateListing() { },
    fetchMyListings() { },
    fetchFilteredListings() { },
    fetchListingsByCategory() { },
    createCategory() { },
    fetchCustomers() { },
};

const listingsSlice = createSlice({
    name: "listings",
    initialState: {
        listingsPage: {
            data: [],
            current_page: 1,
            last_page: 1,
            total: 0,
        },
        categories: [],
        users: [],
        singleListing: null,
        listingErrors: null,
        listingSuccessMessage: "",
    },

    reducers: {
        setListings(state, { payload }) {
            state.listingsPage = {
                data: payload.data,
                current_page: payload.current_page,
                last_page: payload.last_page,
                total: payload.total,
            };
        },

        appendListings(state, { payload }) {
            state.listingsPage = {
                ...payload,
                data: state.listingsPage.data.concat(payload.data),
            };
        },

        setCategories(state, { payload }) {
            state.categories = payload;
        },

        setListingErrors(state, { payload }) {
            state.listingErrors = payload;
        },

        clearListingErrors(state) {
            state.listingErrors = null;
        },

        setListingSuccessMessage(state, { payload }) {
            state.listingSuccessMessage = payload;
        },

        clearListingSuccessMessage(state) {
            state.listingSuccessMessage = "";
        },

        setSingleListing(state, { payload }) {
            state.singleListing = payload;
        },

        deleteListingSuccess(state, { payload }) {
            state.listingsPage.data = state.listingsPage.data.filter(listing => listing.id !== payload);
        },
        setListingsByCategory(state, { payload }) {
            state.listingsPage = {
                data: payload.data,
                current_page: payload.current_page,
                last_page: payload.last_page,
                total: payload.total,
            };
        },
        setUsers(state, { payload }) {
            state.users = payload;
        },
        setUsersErrors(state, { payload }) {
            state.usersErrors = payload;
        },

        ...middlewareActions,
    },
});

export const {
    fetchListings,
    setListings,
    appendListings,
    fetchCategories,
    setCategories,
    createListing,
    setListingErrors,
    clearListingErrors,
    setListingSuccessMessage,
    clearListingSuccessMessage,
    deleteListing,
    deleteListingSuccess,
    fetchListing,
    setSingleListing,
    updateListing,
    fetchMyListings,
    fetchFilteredListings,
    fetchListingsByCategory,
    setListingsByCategory,
    createCategory,
    fetchCustomers,
    setUsers,
    setUsersErrors,
} = listingsSlice.actions;

export default listingsSlice.reducer;
