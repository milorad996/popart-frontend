import React from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import './../css/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveUser, selectIsAuthenticated } from '../store/auth/selectors';
import { logout } from '../store/auth/slice';

function NavbarComponent({ onSidebarToggle }) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const navigate = useNavigate();
    const activeUser = useSelector(selectActiveUser);
    const handleLogout = () => {
        dispatch(logout({
            meta: {
                onSuccessLogout: handleActionSuccessLogout,
            },
        }));
        if (!isAuthenticated) {
            navigate('/');
        }
    }

    function handleActionSuccessLogout() {
        navigate(`/`);
    }

    return (
        <Navbar expand="lg" className="custom-navbar py-2">
            <div className="navbar-content">
                <div className="left-side">
                    <Button
                        variant="link"
                        className="sidebar-toggle-btn"
                        onClick={onSidebarToggle}
                        aria-label="Toggle sidebar"
                    >
                        <FontAwesomeIcon icon={faBars} size="lg" />
                    </Button>

                    <Navbar.Brand as={Link} to="/" className="auto-market">
                        Oglasi.com
                    </Navbar.Brand>
                </div>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                    <Nav className="align-items-center nav-links">
                        {isAuthenticated && activeUser && (
                            <Link
                                to={activeUser.role === "admin" ? "/admin-dashboard" : "/customer-profile"}
                                className={`nav-link mx-2 ${activeUser.role === "admin" ? "admin-link" : "home-link"}`}
                            >
                                {activeUser.role === "admin" ? "ADMIN" : "MOJ PROFIL"}
                            </Link>
                        )}
                        {!isAuthenticated ? (
                            <>
                                <Link to="/register" className="nav-link mx-2 about-link">Registrujte se</Link>
                                <Link to="/login" className="nav-link mx-2 login-link">Ulogujte se</Link>
                            </>
                        ) : (
                            <Button
                                variant="outline-danger"
                                className="ms-3 custom-logout-button"
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Log Out
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavbarComponent;
