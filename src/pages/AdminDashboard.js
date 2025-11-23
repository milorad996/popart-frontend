import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCategories,
    createCategory,
    fetchCustomers,
} from "../store/listings/slice";
import { selectCategories, selectUsers } from "../store/listings/selectors";
import './../css/adminDashboard.css';

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const users = useSelector(selectUsers);

    const [name, setName] = useState("");
    const [parentId, setParentId] = useState("");
    const [type, setType] = useState("main");
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchCustomers());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Category name cannot be empty.");
            return;
        }

        if (type === "sub" && !parentId) {
            setError("Please select a parent category for the subcategory.");
            return;
        }

        dispatch(
            createCategory({
                name,
                parent_id: type === "main" ? null : parentId,
            })
        );

        setName("");
        setParentId("");
        setType("main");
        setError(null);
    };

    return (
        <div className="admin-dashboard">
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="admin-sections">

                <div className="card">
                    <h2>Add New Category</h2>

                    <form onSubmit={handleSubmit} className="category-form">

                        <div className="category-type">
                            <label>
                                <input
                                    type="radio"
                                    checked={type === "main"}
                                    onChange={() => setType("main")}
                                />
                                Main category
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    checked={type === "sub"}
                                    onChange={() => setType("sub")}
                                />
                                Subcategory
                            </label>
                        </div>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter category name"
                        />

                        <select
                            disabled={type === "main"}
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                        >
                            <option value="">Select parent category</option>

                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        {error && <p className="error">{error}</p>}

                        <button type="submit">Create</button>
                    </form>
                </div>

                <div className="card">
                    <h2>Existing Categories</h2>
                    <ul className="category-list">
                        {categories.map((c) => (
                            <li key={c.id} className="category-item">
                                {c.name}

                                {c.children?.length > 0 && (
                                    <ul className="subcategory-list">
                                        {c.children.map((child) => (
                                            <li key={child.id}>
                                                ➝ {child.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card">
                    <h2>Users (Customers)</h2>
                    {users.length === 0 ? (
                        <p>No customers found.</p>
                    ) : (
                        <ul className="user-list">
                            {users.map((user) => (
                                <li key={user.id} className="user-item">
                                    <strong>{user.name}</strong> — {user.email}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
}
