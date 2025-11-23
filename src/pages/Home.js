import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredListings } from "../store/listings/slice";
import { selectCustomerListings } from "../store/listings/selectors";
import Filter from "../components/Filter";
import "../css/home.css";
import ListingCard from "../components/ListingCard";

function Home() {
    const dispatch = useDispatch();
    const listingsPage = useSelector(selectCustomerListings);

    const [filters, setFilters] = useState({
        page: 1,
        search: "",
        minPrice: "",
        maxPrice: "",
        location: "",
        category: "",
    });
    console.log("filter in home", filters);
    useEffect(() => {
        const apiParams = {
            page: filters.page,
            search: filters.search || "",
            min_price: filters.minPrice || "",
            max_price: filters.maxPrice || "",
            location: filters.location || "",
            category_id: filters.category || "",
        };

        dispatch(fetchFilteredListings(apiParams));
    }, [filters, dispatch]);



    const handleFilterChange = (newFilters) => {
        setFilters({
            ...filters,
            ...newFilters,
            page: 1
        });
    };

    const handleNext = () => {
        if (filters.page < listingsPage.last_page) {
            setFilters(prev => ({ ...prev, page: prev.page + 1 }));
        }
    };

    const handlePrev = () => {
        if (filters.page > 1) {
            setFilters(prev => ({ ...prev, page: prev.page - 1 }));
        }
    };

    return (
        <div className="home-wrapper">

            <Filter onFilterChange={handleFilterChange} />

            <div className="listings-grid">
                {listingsPage.data.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePrev} disabled={filters.page === 1}>
                    Prethodna
                </button>

                <span>
                    Strana {filters.page} / {listingsPage.last_page}
                </span>

                <button
                    onClick={handleNext}
                    disabled={filters.page === listingsPage.last_page}
                >
                    Sledeća
                </button>
            </div>
        </div>
    );
}

export default Home;
