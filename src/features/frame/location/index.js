import { createSlice } from '@reduxjs/toolkit';
import { STATUS_CODE } from 'common/constants';
import { queryPlace, queryPredictions } from './actions';

const initialState = {
  predictions: [],
  address: '',
  sessionToken: '',
  lastSessionUpdate: 0,
  placeId: 0,
  coords: null,
  statusCode: STATUS_CODE.NONE,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(queryPredictions.fulfilled, (state, action) => {
        state.predictions = [];
        if (action.payload) {
          const { predictions, timestamp, sessionToken } = action.payload;
          state.sessionToken = sessionToken;
          state.lastSessionUpdate = timestamp;
          state.predictions = predictions;
        }
      })
      .addCase(queryPlace.fulfilled, (state, action) => {
        const { address, coords, placeId, timestamp, sessionToken } = action.payload;

        state.coords = coords;
        state.placeId = placeId;
        state.sessionToken = sessionToken;
        state.lastSessionUpdate = timestamp;
        state.address = address;
        state.statusCode = STATUS_CODE.SUCCESS;
      })
      .addCase(queryPlace.pending, (state, action) => {
        state.statusCode = STATUS_CODE.REQUEST;
      });
  },
});

export default locationSlice.reducer;
