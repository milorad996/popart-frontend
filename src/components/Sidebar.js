import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../store/listings/slice';
import { selectCategories } from '../store/listings/selectors';

import { Link, useLocation } from 'react-router-dom';
import './../css/sidebar.css';

function Sidebar({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const location = useLocation();

    // Dodajemo state za praćenje otvorene kategorije (po id)
    const [openCategoryId, setOpenCategoryId] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Funkcija za toggle otvorene kategorije
    const toggleCategory = (id) => {
        if (openCategoryId === id) {
            setOpenCategoryId(null);  // zatvori ako je već otvorena
        } else {
            setOpenCategoryId(id);    // otvori novu
        }
    };

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={onClose} aria-label="Close sidebar">
                    &times;
                </button>

                <nav>
                    <ul className="category-list">
                        {categories.map(category => (
                            <li key={category.id}>
                                {/* Glavna kategorija - klik na nju menja otvoreno */}
                                <div
                                    className={`category-header ${openCategoryId === category.id ? 'open' : ''}`}
                                    onClick={() => toggleCategory(category.id)}
                                    style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <Link
                                        to={`/categories/${category.id}/listings`}
                                        className={location.pathname.includes(`/categories/${category.id}`) ? 'active' : ''}
                                        onClick={onClose}
                                        style={{ flexGrow: 1 }}
                                    >
                                        {category.name}
                                    </Link>

                                    <span className="toggle-icon">
                                        {openCategoryId === category.id ? '▼' : '▶'}
                                    </span>
                                </div>

                                {/* Podkategorije prikazujemo samo ako je ova otvorena */}
                                {category.children && category.children.length > 0 && openCategoryId === category.id && (
                                    <ul className="subcategory-list">
                                        {category.children.map(sub => (
                                            <li key={sub.id}>
                                                <Link
                                                    to={`/categories/${sub.id}/listings`}
                                                    className={location.pathname.includes(`/categories/${sub.id}`) ? 'active' : ''}
                                                    onClick={onClose}
                                                >
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
