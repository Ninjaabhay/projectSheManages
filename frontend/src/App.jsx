import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IdeaPage from "./components/IdeaPage";
import AddProductForm from "./user/AddProductForm";
import ProductList from "./user/ProductList";
import NotFound from "./notfoundpage/NotFound";
import ProfileSetup from "./pages/ProfileSetup";
import { useUser } from "@clerk/clerk-react";

// The use of AuthProvicer is not neccessary as we can use 'useUser()' to get the most accurate value of user's authentication

// Wrapper for protected routes
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return null;
  return isSignedIn ? children : <Navigate to="/login" replace />;
};

// Wrapper for public-only routes (redirect signed-in users)
const PublicRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return null;
  return isSignedIn ? <Navigate to="/" replace /> : children;
};

// Wrapper for user product routes
const UserProducts = () => {
  const { userId } = useParams();
  return <ProductList userId={userId} />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/products" element={<Products />} />
        <Route path="/ideas" element={<IdeaPage />} />

        {/* Public-only routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login/*"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/signup/*"
          element={
            <PublicRoute>
              <Signup routing="path" path="/signup" />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/profile-setup"
          element={
            <ProtectedRoute>
              <ProfileSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <AddProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:userId"
          element={
            <ProtectedRoute>
              <UserProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/myproduct/:userId"
          element={
            <ProtectedRoute>
              <UserProducts />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
