import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../redux/ecom/productSlice";
import Button from "../reusable/Button";
import Input from "../reusable/Input";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [errors, setErrors] = useState({});

  const fields = [
    {
      name: "title",
      placeholder: "Product Title",
      type: "text",
      validation: (value) => (!value ? "Title is required." : ""),
    },
    {
      name: "price",
      placeholder: "Price",
      type: "number",
      validation: (value) =>
        !value
          ? "Price is required."
          : value <= 0
          ? "Price must be greater than 0."
          : "",
    },
    {
      name: "description",
      placeholder: "Description",
      type: "textarea",
      validation: (value) => (!value ? "Description is required." : ""),
    },
    {
      name: "categoryId",
      placeholder: "Category ID",
      type: "number",
      validation: (value) =>
        !value ? "Category ID is required." : isNaN(value) ? "Invalid ID." : "",
    },
    {
      name: "images",
      placeholder: "Image URL",
      type: "text",
      validation: (value) => {
        if (!value) return "Image URL is required.";
        const urlRegex = /^(https?:\/\/[^\s[\]"]+)$/;
        if (!urlRegex.test(value)) return "Enter a valid URL without [\"\"]";
        return "";
      },
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const field = fields.find((field) => field.name === name);
    const error = field ? field.validation(value) : "";
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      images: [formData.images], 
    };
    dispatch(addProduct(productData));
    resetForm();
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setCurrentProductId(product.id);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      images: product.images[0], 
    });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      id: currentProductId,
      images: [formData.images], 
    };
    dispatch(updateProduct(productData));
    resetForm();
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrentProductId(null);
    setFormData({
      title: "",
      price: "",
      description: "",
      categoryId: "",
      images: "",
    });
    setErrors({});
  };

  const hasErrors = Object.values(errors).some((error) => error);
  const isFormIncomplete = fields.some((field) => !formData[field.name]);

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={editMode ? handleUpdateProduct : handleAddProduct}>
        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: "10px" }}>
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {errors[field.name] && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors[field.name]}</p>
            )}
          </div>
        ))}

        <Button
          type="submit"
          label={editMode ? "Update Product" : "Add Product"}
          className="submit-btn"
          disabled={hasErrors || isFormIncomplete}
        />
      </form>

      <ul>
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <div>
              {product.title} - ${product.price}
            </div>
            <div className="product-actions">
              <Button
                label="Edit"
                onClick={() => handleEditProduct(product)}
              />
              <Button
                label="Delete"
                onClick={() => handleDeleteProduct(product.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
