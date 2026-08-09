import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const createMaintenanceRequest =
  createAsyncThunk(
    "maintenance/create",
    async (data, thunkAPI) => {
      try {
        const response = await api.post(
          "/maintenance",
          data
        );

        return response.data.request;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to submit maintenance request"
        );
      }
    }
  );

export const fetchMyMaintenance =
  createAsyncThunk(
    "maintenance/fetchMy",
    async (_, thunkAPI) => {
      try {
        const response = await api.get(
          "/maintenance/my"
        );

        return response.data.requests;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch maintenance requests"
        );
      }
    }
  );

const maintenanceSlice = createSlice({
  name: "maintenance",

  initialState: {
    requests: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearMaintenanceError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        createMaintenanceRequest.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createMaintenanceRequest.fulfilled,
        (state, action) => {
          state.loading = false;
          state.requests.unshift(action.payload);
        }
      )

      .addCase(
        createMaintenanceRequest.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(
        fetchMyMaintenance.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMyMaintenance.fulfilled,
        (state, action) => {
          state.loading = false;
          state.requests = action.payload;
        }
      )

      .addCase(
        fetchMyMaintenance.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearMaintenanceError,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;