import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  menuDetails: null,
  isLoading: false,
};

export const getMenuDetails = createAsyncThunk(
  "menu/getMenuDetails", 
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/menu/get/${id}`
    );
    return response.data;
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
      })
      .addCase(getMenuDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuDetails = action.payload;
      })
      .addCase(getMenuDetails.rejected, (state) => {
        state.isLoading = false;
        state.menuDetails = null;
      });
  },
});

export const { setMenuDetails } = menuSlice.actions;
export default menuSlice.reducer;
