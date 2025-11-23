import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListingsByCategory } from '../store/listings/slice';
import { selectCustomerListings as selectListingsPage } from '../store/listings/selectors';

import './../css/categoryListings.css';
import ListingCard from '../components/ListingCard';

function CategoryListings() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const listingsPage = useSelector(selectListingsPage);

    useEffect(() => {
        dispatch(fetchListingsByCategory({ categoryId: id, page: 1 }));
    }, [dispatch, id]);

    const categoryName = listingsPage.data.length > 0
        ? listingsPage.data[0].category?.name
        : '';

    return (
        <div className="category-listings-container">
            <h1>{categoryName}</h1>
            <div className="listings-grid">
                {listingsPage.data.length === 0 && <p>Trenutno nema oglasa u ovoj kategoriji.</p>}

                {listingsPage.data.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
}


export default CategoryListings;
