import { configureStore } from '@reduxjs/toolkit';
import tableSlice from './tableSlice';
import distanceSlice from './distanceSlice';


const store = configureStore({
  reducer: {
    table: tableSlice,
    distance: distanceSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
