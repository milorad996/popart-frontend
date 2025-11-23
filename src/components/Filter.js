import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/listings/slice";
import { selectCategories } from "../store/listings/selectors";
import "../css/filter.css";

function Filter({ onFilterChange }) {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const [filters, setFilters] = useState({
        search: "",
        minPrice: "",
        maxPrice: "",
        location: "",
        category: "",
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    return (
        <div className="filter-wrapper">
            <h2 className="filter-title">Pretraga oglasa</h2>

            <form className="filter-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="search"
                    placeholder="Naziv ili opis..."
                    value={filters.search}
                    onChange={handleInputChange}
                />

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min cena"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                />

                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max cena"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Lokacija"
                    value={filters.location}
                    onChange={handleInputChange}
                />

                <select
                    name="category"
                    value={filters.category}
                    onChange={handleInputChange}
                >
                    <option value="">Sve kategorije</option>

                    {categories?.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="filter-btn">Pretraži</button>
            </form>
        </div>
    );
}

export default Filter;
