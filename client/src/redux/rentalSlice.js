import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const createRental = createAsyncThunk(
  "rentals/createRental",
  async (rentalData, thunkAPI) => {
    try {
      const response = await api.post("/rentals", rentalData);

      return response.data.rental;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create rental"
      );
    }
  }
);

export const fetchMyRentals = createAsyncThunk(
  "rentals/fetchMyRentals",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/rentals/my");

      return response.data.rentals;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch rentals"
      );
    }
  }
);

const initialState = {
  rentals: [],
  currentRental: null,
  loading: false,
  error: null,
};

const rentalSlice = createSlice({
  name: "rentals",

  initialState,

  reducers: {
    clearRentalError: (state) => {
      state.error = null;
    },

    clearCurrentRental: (state) => {
      state.currentRental = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create rental
      .addCase(createRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createRental.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRental = action.payload;
        state.rentals.unshift(action.payload);
      })

      .addCase(createRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get my rentals
      .addCase(fetchMyRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals = action.payload;
      })

      .addCase(fetchMyRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearRentalError,
  clearCurrentRental,
} = rentalSlice.actions;

export default rentalSlice.reducer;