import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const intialState = {
  isLoading: false,
  addressInfo: [],
};
export const newAddress = createAsyncThunk(
  "/address/newAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/address/add",
      formData
    );
    return response.data;
  }
);
export const fetchAddress = createAsyncThunk("address/fetch", async (id) => {
  const response = await axios.get(
    `http:localhost:5000/api/shop/address/get/${id}`
  );
  return response.data;
});
export const editAddress = createAsyncThunk(
  "address/edit",
  async ({ id, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/shop/address/edit/${id}/${addressId}`,
      formData
    );
    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async ({ id, addressId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${id}/${addressId}`
    );
    return response.data;
  }
);
const addressSlice = createSlice({
  name: "address",
  intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newAddress.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(newAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressInfo = action.payload;
      })

      .addCase(newAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressInfo = [];
      });
  },
});
export default addressSlice.reducer;
