import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setLoginErrors } from "../store/auth/slice";
import { selectActiveUser, selectIsAuthenticated, selectLoginErrors } from "../store/auth/selectors";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import './../css/login.css';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginErrors = useSelector(selectLoginErrors);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(userData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (activeUser.role === "customer") {
                navigate("/customer-profile");
            } else if (activeUser.role === "admin") {
                navigate("/admin-dashboard");
            }
        }
    }, [isAuthenticated, navigate, activeUser]);

    useEffect(() => {
        return () => {
            dispatch(setLoginErrors(null));
        };
    }, [dispatch]);

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Prijavite se</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {loginErrors && (
                        <ul className="error-msg">
                            {Object.entries(loginErrors).map(([key, value]) => (
                                <li key={key}>{value}</li>
                            ))}
                        </ul>
                    )}
                    <button type="submit" className="login-btn">Ulogujte se</button>
                </form>

                <div className="register-prompt">
                    <p>Još niste registrovani?</p>
                    <button onClick={() => navigate("/register")} className="register-btn">
                        Kreirajte nalog
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;