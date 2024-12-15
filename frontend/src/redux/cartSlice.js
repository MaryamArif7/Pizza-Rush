import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  isLoading: false,
};
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, menuId, quantity }) => {
    const response = await axios.post("http://localhost:5000/api/menu/cart/add", {
       id,
      menuId,
      quantity,
    }).catch((error) => {
      console.error("Error adding to cart:", error.response || error.message);
    });
    return response.data;
    
  }
);
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (id) => {
    console.log("Sending request with userId:", id); 
    const response = await axios.get(`
            
             http://localhost:5000/api/menu/cart/get/${id}
            `);
    return response.data;
  }
);
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ id, menuId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/menu/cart/update-cart",
      {
        id,
        menuId,
        quantity,
      }
    );

    return response.data;
  }
);
export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ id, menuId }) => {
    console.log("from delete stoore handle", id, menuId);
    const response = await axios.post(
      `http:localhost:5000/api/menu/cart/${id}/${menuId}`
    );
    return response.data;
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })

      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = true;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});
export default cartSlice.reducer;
