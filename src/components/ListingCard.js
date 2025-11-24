import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ListingCard({ listing, showActions = false, onEdit, onDelete }) {

    return (
        <div className="listing-card">
            <Link to={`/listings/${listing.id}`} className="listing-link">
                <div className="listing-image-wrapper">
                    {listing.images && listing.images.length > 0 ? (
                        <img
                            src={`https://web-production-6bf77.up.railway.app/storage/${listing?.images[0].path}`}
                            alt={listing.title}
                            className="listing-image"
                        />
                    ) : (
                        <div className="listing-image-placeholder">Nema slike</div>
                    )}
                </div>
                <div className="listing-info">
                    <h3 className="listing-title">{listing.title}</h3>
                    <p className="listing-price">{listing.price ? `${listing.price} RSD` : 'Cena nije dostupna'}</p>
                </div>
            </Link>

            {showActions && (
                <div className="listing-actions">
                    <button className="btn-edit" onClick={() => onEdit(listing)}>
                        Edit
                    </button>
                    <button className="btn-delete" onClick={() => onDelete(listing.id)}>
                        Obriši
                    </button>
                </div>
            )}
        </div>
    );
}

ListingCard.propTypes = {
    listing: PropTypes.object.isRequired,
    showActions: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default ListingCard;
