import { takeLatest, call, put } from "redux-saga/effects";
import listingService from "../../services/ListingService"; // Napravi listingService kao što imaš CarService

import {
    fetchListings,
    setListings,
    appendListings,
    fetchCategories,
    setCategories,
    createListing,
    setListingErrors,
    setListingSuccessMessage,
    deleteListing,
    deleteListingSuccess,
    fetchListing,
    setSingleListing,
    updateListing,
    fetchMyListings,
    fetchFilteredListings,
    setListingsByCategory,
    fetchListingsByCategory,
    createCategory,
    setUsers,
    setUsersErrors,
    fetchCustomers,
} from "./slice";


function* fetchListingsHandler({ payload }) {
    try {
        const listings = yield call(listingService.getAll, payload?.page);

        if (payload?.page > 1) {
            yield put(appendListings(listings));
        } else {
            yield put(setListings(listings));
        }
    } catch (e) {
        console.error(e);
    }
}
function* fetchMyListingsHandler({ payload }) {
    try {
        const listings = yield call(listingService.getMyListings, payload?.page);

        if (payload?.page > 1) {
            yield put(appendListings(listings));
        } else {
            yield put(setListings(listings));
        }
    } catch (e) {
        console.error(e);
    }
}


function* fetchCategoriesHandler() {
    try {
        const categories = yield call(listingService.getCategories);
        yield put(setCategories(categories));
    } catch (e) {
        console.error(e);
    }
}

function* createListingHandler({ payload }) {
    try {
        const data = yield call(listingService.create, payload);
        yield put(setListingSuccessMessage(data.message));
        yield put(fetchListings({ page: 1 }));
    } catch (e) {
        console.error("Greška u createListingHandler:", e);
        if (e.response) {
            console.error("Status:", e.response.status);
            console.error("Data:", e.response.data);
            yield put(setListingErrors(e.response.data.message || "Validation error"));
        } else {
            alert("Došlo je do greške pri kreiranju oglasa.");
        }
    }
}
function* updateListingHandler({ payload }) {
    try {
        const { id, data } = payload;

        const response = yield call(listingService.update, id, data);

        yield put(setListingSuccessMessage(response.message));
        yield put(fetchListings({ page: 1 }));
    } catch (e) {
        console.error("Greška u updateListingHandler:", e);

        if (e.response) {
            yield put(setListingErrors(e.response.data.message || "Validation error"));
        }
    }
}
function* fetchFilteredListingsHandler({ payload }) {
    try {
        const listings = yield call(listingService.filter, payload);

        if (payload?.page > 1) {
            yield put(appendListings(listings));
        } else {
            yield put(setListings(listings));
        }
    } catch (e) {
        console.error("Greška u fetchFilteredListingsHandler:", e);
    }
}




function* deleteListingHandler({ payload }) {
    try {
        yield call(listingService.deleteListing, payload);
        yield put(deleteListingSuccess(payload));
    } catch (e) {
        alert("Brisanje oglasa nije uspelo.");
    }
}

function* fetchSingleListingHandler({ payload }) {
    try {
        const data = yield call(listingService.getListing, payload);
        yield put(setSingleListing(data));
    } catch (e) {
        console.error(e);
    }
}
function* fetchListingsByCategoryHandler({ payload }) {
    try {
        const { categoryId, page } = payload;
        const listings = yield call(listingService.getListingsByCategory, categoryId, page);
        yield put(setListingsByCategory(listings));
    } catch (e) {
        console.error(e);
    }
}
function* createCategoryHandler({ payload }) {
    try {
        const response = yield call(listingService.createCategory, payload);

        yield put(fetchCategories());

        if (response?.message) {
            yield put(setListingSuccessMessage(response.message));
        } else {
            yield put(setListingSuccessMessage("Kategorija je uspešno kreirana"));
        }
    } catch (e) {
        if (e.response) {
            yield put(setListingErrors(e.response.data || e.response.data.message || "Validation error"));
        } else {
            yield put(setListingErrors("Greška prilikom kreiranja kategorije"));
        }
    }
}
function* fetchCustomersHandler() {
    try {
        const users = yield call(listingService.getCustomers);
        yield put(setUsers(users));
    } catch (e) {
        yield put(setUsersErrors("Greška prilikom dohvata korisnika"));
    }
}



export function* watchListingsSaga() {
    yield takeLatest(fetchListings.type, fetchListingsHandler);
    yield takeLatest(fetchCategories.type, fetchCategoriesHandler);
    yield takeLatest(createListing.type, createListingHandler);
    yield takeLatest(deleteListing.type, deleteListingHandler);
    yield takeLatest(fetchListing.type, fetchSingleListingHandler);
    yield takeLatest(updateListing.type, updateListingHandler);
    yield takeLatest(fetchMyListings.type, fetchMyListingsHandler);
    yield takeLatest(fetchFilteredListings.type, fetchFilteredListingsHandler);
    yield takeLatest(fetchListingsByCategory.type, fetchListingsByCategoryHandler);
    yield takeLatest(createCategory.type, createCategoryHandler);
    yield takeLatest(fetchCustomers.type, fetchCustomersHandler);
}
