import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { fetchListing, setSingleListing } from '../store/listings/slice';
import { selectSingleListing } from '../store/listings/selectors';

import './../css/listingDetails.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ListingDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const listing = useSelector(selectSingleListing);

    useEffect(() => {
        dispatch(fetchListing(id));
        return () => dispatch(setSingleListing(null));
    }, [dispatch, id]);

    if (!listing) {
        return <p className="loading-text">Učitavanje oglasa...</p>;
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
    };

    return (
        <div className="listing-details-container">
            <h1 className="listing-title">{listing.title}</h1>

            <div className="listing-main-content">

                <div className="listing-images">
                    {listing.images && listing.images.length > 0 ? (
                        <Slider {...sliderSettings}>
                            {listing.images.map(img => (
                                <div key={img.id} className="image-slide">
                                    <img
                                        src={`https://web-production-6bf77.up.railway.app/storage/${img.path}`}
                                        alt={img.alt || listing.title}
                                        className="listing-image"
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="no-image-placeholder">Nema slika</div>
                    )}
                </div>

                <div className="listing-info">
                    <p className="listing-price"><strong>Cena:</strong> {listing.price ? `${listing.price} RSD` : 'Nema cene'}</p>
                    <p className="listing-condition"><strong>Stanje:</strong> {listing.condition === 'novo' ? 'Novo' : 'Polovno'}</p>
                    <p className="listing-phone"><strong>Telefon:</strong> {listing.phone || 'Nije dostupan'}</p>
                    <p className="listing-location"><strong>Lokacija:</strong> {listing.location || 'Nije navedena'}</p>
                    <p className="listing-category"><strong>Kategorija:</strong> {listing.category?.name || 'Nepoznata'}</p>
                    <p className="listing-user"><strong>Objavio:</strong> {listing.user?.name || 'Nepoznato'}</p>

                    <div className="listing-description">
                        <h2>Opis</h2>
                        <p>{listing.description || 'Nema opisa'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListingDetails;
