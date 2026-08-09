import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchAdminRentals = createAsyncThunk(
  "admin/fetchRentals",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/rentals");

      return response.data.rentals;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch rentals"
      );
    }
  }
);

export const updateRentalStatus = createAsyncThunk(
  "admin/updateRentalStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await api.patch(
        `/rentals/${id}/status`,
        { status }
      );

      return response.data.rental;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update rental"
      );
    }
  }
);

export const fetchAdminMaintenance = createAsyncThunk(
  "admin/fetchMaintenance",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/maintenance");

      return response.data.requests;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch maintenance requests"
      );
    }
  }
);

export const updateMaintenanceStatus = createAsyncThunk(
  "admin/updateMaintenanceStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await api.patch(
        `/maintenance/${id}/status`,
        { status }
      );

      return response.data.request;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update maintenance request"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    rentals: [],
    maintenance: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminRentals.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals = action.payload;
      })

      .addCase(fetchAdminRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateRentalStatus.fulfilled, (state, action) => {
        const index = state.rentals.findIndex(
          (rental) => rental._id === action.payload._id
        );

        if (index !== -1) {
          state.rentals[index] = action.payload;
        }
      })

      .addCase(updateRentalStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchAdminMaintenance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminMaintenance.fulfilled, (state, action) => {
        state.loading = false;
        state.maintenance = action.payload;
      })

      .addCase(fetchAdminMaintenance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(
        updateMaintenanceStatus.fulfilled,
        (state, action) => {
          const index = state.maintenance.findIndex(
            (request) =>
              request._id === action.payload._id
          );

          if (index !== -1) {
            state.maintenance[index] = action.payload;
          }
        }
      )

      .addCase(
        updateMaintenanceStatus.rejected,
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearAdminError,
} = adminSlice.actions;

export default adminSlice.reducer;