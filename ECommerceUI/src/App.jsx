import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Client/Signup";
import Login from "./pages/Client/Login";
import Home from "./pages/Client/Home";
import ProductDetail from "./pages/Client/ProductDetail";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import PageContainer from "./containers/PageContainer";
import Search from "./pages/Client/Search";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminOrders from "./pages/Admin/AdminOrders";
import ForgotPassword from "./pages/Client/ForgotPassword";
import UpdatePassword from "./pages/Client/UpdatePassword";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Navbar />

        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:categoryId" element={<Home />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password/:userId/:resetToken" element={<UpdatePassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search/:query" element={<Search />} />

            <Route path="/admin" element={<AdminPanel />}>
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </PageContainer>

        <Footer />
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
