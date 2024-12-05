import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  menuDetails:null,
  isLoading: false,
  error: null,
};

export const getMenuDetails = createAsyncThunk(
  "menu/getMenuDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/menu/get/${id}`
      );
      return response.data;
    } catch (error) {
      return (
        error.response?.data || "Failed to fetch menu details"
      );
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuDetails: (state) => {
      state.menuDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMenuDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuDetails = action.payload;
      })
      .addCase(getMenuDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.menuDetails = null;
        state.error = action.payload;
      });
  },
});

export const { setMenuDetails } = menuSlice.actions;
export default menuSlice.reducer;
