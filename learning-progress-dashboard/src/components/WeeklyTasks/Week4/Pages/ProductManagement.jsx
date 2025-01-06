import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../Redux/productSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const [formData, setFormData] = useState({ title: "", price: "", description: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData));
    setFormData({ title: "", price: "", description: "" });
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setCurrentProductId(product.id);
    setFormData({ title: product.title, price: product.price, description: product.description });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...formData, id: currentProductId }));
    setEditMode(false);
    setFormData({ title: "", price: "", description: "" });
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={editMode ? handleUpdateProduct : handleAddProduct}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">{editMode ? "Update Product" : "Add Product"}</button>
      </form>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
