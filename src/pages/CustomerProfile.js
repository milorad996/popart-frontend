import { useState, useEffect } from "react";
import './../css/customerProfile.css';

import { useSelector, useDispatch } from "react-redux";

import { selectActiveUser } from "../store/auth/selectors";
import { selectCustomerListings, selectCategories } from "../store/listings/selectors";

import { createListing, deleteListing, fetchCategories, updateListing, fetchMyListings } from "../store/listings/slice";
import ListingCard from "../components/ListingCard";

function CustomerProfile() {
    const dispatch = useDispatch();

    const activeUser = useSelector(selectActiveUser);
    const listingsPage = useSelector(selectCustomerListings);
    const categories = useSelector(selectCategories);

    const [showForm, setShowForm] = useState(false);
    const [editingListing, setEditingListing] = useState(null);


    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-');
    };

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        condition: "novo",
        phone: "",
        location: "",
        category_id: ""
    });

    const [selectedParentCategoryId, setSelectedParentCategoryId] = useState("");

    useEffect(() => {
        dispatch(fetchMyListings());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleParentCategoryChange = (e) => {
        const parentId = e.target.value;
        setSelectedParentCategoryId(parentId);

        setFormData(prev => ({
            ...prev,
            category_id: ""
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "title") {
            setFormData(prev => ({
                ...prev,
                title: value,
                slug: generateSlug(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImages = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            images: formData.images ? Array.from(formData.images) : [],
        };

        if (editingListing) {
            dispatch(updateListing({ id: editingListing.id, data: payload }));
        } else {
            dispatch(createListing(payload));
        }

        setShowForm(false);
        setEditingListing(null);

        setFormData({
            title: "",
            description: "",
            price: "",
            condition: "novo",
            phone: "",
            location: "",
            category_id: ""
        });

        setSelectedParentCategoryId("");
    };




    const handleDelete = (id) => {
        dispatch(deleteListing(id));
    };

    return (
        <div className="customer-wrapper">

            <div className="customer-block">
                <h2>Korisnik</h2>
                <p><strong>Ime:</strong> {activeUser?.name}</p>
                <p><strong>Email:</strong> {activeUser?.email}</p>

                <button
                    className="btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Sakrij formu" : "Postavi oglas"}
                </button>
            </div>

            {showForm && (
                <div className="customer-block">
                    <h3>Novi oglas</h3>

                    <form onSubmit={handleSubmit} className="listing-form">

                        <input
                            type="text"
                            name="title"
                            placeholder="Naslov"
                            onChange={handleChange}
                            value={formData.title}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Opis"
                            onChange={handleChange}
                            value={formData.description}
                        ></textarea>

                        <input
                            type="number"
                            name="price"
                            placeholder="Cena"
                            onChange={handleChange}
                            value={formData.price}
                            required
                        />

                        <select
                            name="condition"
                            onChange={handleChange}
                            value={formData.condition}
                        >
                            <option value="novo">Novo</option>
                            <option value="polovno">Polovno</option>
                        </select>

                        <input
                            type="text"
                            name="phone"
                            placeholder="Telefon"
                            onChange={handleChange}
                            value={formData.phone}
                        />

                        <input
                            type="text"
                            name="location"
                            placeholder="Lokacija"
                            onChange={handleChange}
                            value={formData.location}
                        />

                        <select
                            name="parent_category"
                            onChange={handleParentCategoryChange}
                            value={selectedParentCategoryId}
                        >
                            <option value="">Izaberi glavnu kategoriju</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>

                        {selectedParentCategoryId && (
                            <select
                                name="category_id"
                                onChange={handleChange}
                                value={formData.category_id}
                                required
                            >
                                <option value="">Izaberi podkategoriju</option>
                                {categories
                                    ?.find(cat => cat.id === Number(selectedParentCategoryId))
                                    ?.children.map(child => (
                                        <option key={child.id} value={child.id}>{child.name}</option>
                                    ))
                                }
                            </select>
                        )}

                        <input type="file" name="images" multiple onChange={handleImages} />

                        <button className="btn-primary">Pošalji</button>
                    </form>
                </div>
            )}

            <div className="customer-block">
                <h3>Moji oglasi</h3>
                {listingsPage.data?.length === 0 && <p>Nema oglasa.</p>}
                <div className="listings-grid">
                    {listingsPage.data?.map(listing => (
                        <ListingCard
                            key={listing.id}
                            listing={listing}
                            showActions={true}
                            onEdit={(listing) => {
                                setEditingListing(listing);
                                setShowForm(true);
                                setSelectedParentCategoryId(listing.category?.parent_id || "");
                                setFormData({
                                    title: listing.title,
                                    description: listing.description,
                                    price: listing.price,
                                    condition: listing.condition,
                                    phone: listing.phone,
                                    location: listing.location,
                                    category_id: listing.category_id,
                                });
                            }}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>


        </div >
    );
}

export default CustomerProfile;
