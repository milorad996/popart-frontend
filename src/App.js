import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavbarComponent from './components/Navbar';
import Sidebar from './components/Sidebar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CustomerProfile from './pages/CustomerProfile';
import AdminDashboard from './pages/AdminDashboard';
import CategoryListings from './pages/CategoryListings';
import { useState } from 'react';
import ListingDetails from './pages/ListingDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="App">
      <NavbarComponent onSidebarToggle={toggleSidebar} />

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div
        className="main-content"
        style={{
          marginLeft: sidebarOpen ? '240px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
        onClick={sidebarOpen ? closeSidebar : undefined}
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/categories/:id/listings" element={<CategoryListings />} />
          <Route exact path="/listings/:id" element={<ListingDetails />} />

          <Route
            exact
            path="/customer-profile"
            element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
