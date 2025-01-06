import React, { useState } from "react";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CartPage from "./Pages/CartPage";
import ProductManagement from "./Pages/ProductManagement";
import "./FullTask.css";


const FullTaskWeek4 = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("login");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView("product-list");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("login");
  };

  return (
    <div className="full-task-container">
      <div className="navigation">
        {isAuthenticated ? (
          <>
            <button
              className={currentView === "product-list" ? "active" : ""}
              onClick={() => setCurrentView("product-list")}
            >
              Product List
            </button>
            {selectedProductId && (
              <button
                className={currentView === "product-details" ? "active" : ""}
                onClick={() => setCurrentView("product-details")}
              >
                Product Details
              </button>
            )}
            <button
              className={currentView === "cart" ? "active" : ""}
              onClick={() => setCurrentView("cart")}
            >
              Cart
            </button>
            


{/*   تزبيط الرول واعادة المنجمنت (جاهزة تقريبا)
 اذا رجعت علكود مرة تانية 
---- نيد تايممم*/}
 

            {/* <button
              className={currentView === "product-management" ? "active" : ""}
              onClick={() => setCurrentView("product-management")}
            >
              Manage Products
            </button> */}
            
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button
              className={currentView === "login" ? "active" : ""}
              onClick={() => setCurrentView("login")}
            >
              Login
            </button>
            <button
              className={currentView === "signup" ? "active" : ""}
              onClick={() => setCurrentView("signup")}
            >
              Signup
            </button>
          </>
        )}
      </div>

      <div className="content">
        {!isAuthenticated ? (
          currentView === "login" ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Signup />
          )
        ) : (
          <>
            {currentView === "product-list" && (
              <ProductList
                onProductSelect={(id) => {
                  setSelectedProductId(id);
                  setCurrentView("product-details");
                }}
              />
            )}
            {currentView === "product-details" && selectedProductId && (
              <ProductDetails productId={selectedProductId} />
            )}
            {currentView === "cart" && <CartPage />}
            {currentView === "product-management" && <ProductManagement />}
          </>
        )}
      </div>
    </div>
  );
};

export default FullTaskWeek4;
