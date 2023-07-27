import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAsyncDistances, getAsyncMatchedCities } from './utils/backendEndpointsImitation';
import { TCities } from './utils/distanceCalculation';


export const requestMatchedCities = createAsyncThunk(
  'distance/requestMatchedCities',
  async (str: string, options) => {
    const { rejectWithValue } = options;
    try {
      const response = await getAsyncMatchedCities(str);
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const requestDistancesCalculation = createAsyncThunk(
  'distance/requestDistancesCalculation',
  async (cities: TCities, options) => {
    const { rejectWithValue } = options;
    try {
      const response = await getAsyncDistances(cities);
      console.log('response: ', response);
      return response as number[];
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
)

export const distanceSlice = createSlice({
  name: 'distance',
  initialState: {
    freeDestinationId: 2,
    currentDestinationId: 0,
    destinations: [
      {
        id: 0,
        city: null,
      },
      {
        id: 1,
        city: null,
      },
    ],
    matchedCities: [],
    distances: [],
    responseStatus: null,
    errorMessage: null,
  },
  reducers: {
    clearMatchedCities: (state) => {
      state.matchedCities = [];
    },
    setNewDestinationId: (state) => {
      state.freeDestinationId += 1;
    },
    addNewDestination: (state, action) => {
      state.destinations.push({
        id: action.payload,
        city: null,
      });
    },
    deleteDestination: (state, action) => {
      state.destinations = state.destinations.filter(({ id }) => id !== action.payload);
    },
    setCity: (state, action) => {
      const currentDestination = state.destinations.find(({ id }) => id === action.payload.id);
      currentDestination.city = action.payload.city;
    },
    setCurrentDestinationId: (state, action) => {
      state.currentDestinationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestMatchedCities.pending, (state) => {
      state.responseStatus = 'loading';
    });
    builder.addCase(requestMatchedCities.fulfilled, (state, action) => {
      state.responseStatus = 'success';
      state.matchedCities = action.payload as string[];
    });
    builder.addCase(requestMatchedCities.rejected, (state, action) => {
      state.responseStatus = 'rejected';
      state.errorMessage = action.payload;
    });

    builder.addCase(requestDistancesCalculation.pending, (state) => {
      state.responseStatus = state.responseStatus = 'loading';
    });
    builder.addCase(requestDistancesCalculation.fulfilled, (state, action) => {
      state.responseStatus = 'success';
      state.distances = action.payload
    })
    builder.addCase(requestDistancesCalculation.rejected, (state, action) => {
      state.responseStatus = 'rejected';
      state.errorMessage = action.payload;
    })
  }
});

export const {
  clearMatchedCities,
  setNewDestinationId,
  addNewDestination,
  deleteDestination,
  setCity,
  setCurrentDestinationId,
} = distanceSlice.actions;

export default distanceSlice.reducer;
