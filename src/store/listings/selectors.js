export function selectCustomerListings(state) {
    return state.listings.listingsPage || { data: [], current_page: 1, last_page: 1, total: 0 };
}

export function selectCategories(state) {
    return state.listings.categories || [];
}

export function selectSingleListing(state) {
    return state.listings.singleListing;
}

export function selectListingErrors(state) {
    return state.listings.listingErrors;
}

export function selectListingSuccessMessage(state) {
    return state.listings.listingSuccessMessage;
}
export function selectUsers(state) {
    return state.listings.users || [];
}
