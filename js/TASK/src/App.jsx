

import React, { useState } from "react";
import TaskMang from "./pages/taskmang"; 
import { TaskProvider } from "./components/taskmang/TaskContext";
import { FavoritesProvider } from "./components/taskmang/FavoritesContext";
import { Provider } from "react-redux"; 
import store from "./components/redux/store"; 
import ContextFavorites  from "./components/taskmang/ContextFavorites";
import ReduxFavorites from "./components/taskmang/ReduxFavorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chat from "./pages/chat"; 
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Ecom from "./pages/ecom";
import ProductList from "./components/ecom/ProductList";
import CartPage from "./components/ecom/CartPage";
import ProductManagement from "./components/ecom/ProductManagement";
import ProductDetails from "./components/ecom/ProductDetails";


import ProtectedRoute from "./components/ProtectedRoute"; 
import { useUser } from "./components/UserContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear(); 
    console.log("User logged out and local storage cleared.");
  };
  
  
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

       <Route path="/signup" element={<Signup />} />
 
       <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />

          

        <Route
                    path="/chat"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Chat />
                      </ProtectedRoute>
                    }
                  />



        <Route
                  path="/taskmang/*"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <Provider store={store}>
                        <FavoritesProvider>
                          <TaskProvider>
                            <TaskManagementRoutes />
                          </TaskProvider>
                        </FavoritesProvider>
                      </Provider>
                    </ProtectedRoute>
                  }
                />
          
        <Route
            path="/ecommerce/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Provider store={store}>
                  <EcommerceRoutes />
                </Provider>
              </ProtectedRoute>
            }
          />

      </Routes>
    </Router>
  );
};

const TaskManagementRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TaskMang />} />
      <Route path="/favorites-context" element={<ContextFavorites />} />
      <Route path="/favorites-redux" element={<ReduxFavorites />} />
    </Routes>
  );

  
};
const EcommerceRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Ecom />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/management" element={<ProductManagement />} />
      <Route path="/details/:productId" element={<ProductDetails />} />
      </Routes>
  ); 
};


export default App;


