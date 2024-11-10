import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  menuDetails: [],
  isLoading: false,
};
export const getMenuDetails= createAsyncThunk(
  "menu/getMenuDetails",
  async (id, ) => {
    const response = await axios.get(
      `http://localhost:5000/api/menu/get/${id}`,
      {
        id,
   
      }
    );
    return response.data;
  }
);
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuDetails.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getMenuDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.  menuDetails = action.payload.data;
      })

      .addCase(getMenuDetails.rejected, (state) => {
        state.isLoading = false;
        state.  menuDetails = null;
      })

  },
});
export default menuSlice.reducer;
