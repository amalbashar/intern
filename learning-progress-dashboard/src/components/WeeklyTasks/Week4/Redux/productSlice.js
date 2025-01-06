import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Services/axiosInstance";

//بجيب البرودكتس من ال api
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await api.get("/products");
  return response.data;
});

// بضيف برودكت 
export const addProduct = createAsyncThunk("products/add", async (newProduct) => {
  const response = await api.post("/products", newProduct);
  return response.data;
});

// تعديل البرودكت
export const updateProduct = createAsyncThunk("products/update", async (updatedProduct) => {
  const response = await api.put(`/products/${updatedProduct.id}`, updatedProduct);
  return response.data;
});

// ديليت البرودكت
export const deleteProduct = createAsyncThunk("products/delete", async (productId) => {
  await api.delete(`/products/${productId}`);
  return productId;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
