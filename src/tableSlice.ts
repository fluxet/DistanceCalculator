import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RequestParams {
  url: string;
};

export const setData = createAsyncThunk(
  'table/setData',
  async ({ url }: RequestParams, options) => {
    const { rejectWithValue } = options;
    try {
      const response = await fetch(url);
      const rows = (await response.json()).map((row: { rowKey: number; id: number; }) => {
        row.rowKey = row.id - 1;
        return row;
      });

      const columnNames = Object.keys(rows[0]).filter((key) => key !== 'rowKey');

      return { rows, columnNames };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    rows: [],
    columnNames: [],
    responseStatus: null,
    errorMessage: null,
  },
  reducers: {
    updateContent: (state, action) => {
      const { rowKey, name, content } = action.payload;
      const currentRow = state.rows.find((row) => row.rowKey === rowKey);
      currentRow[name] = content;
    },
    sort: (state, action) => {
      const { name } = action.payload;
      state.rows.sort((a, b) => (a[name] > b[name]) ? 1 : -1);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setData.pending, (state) => {
      state.responseStatus = 'loading';
    });
    builder.addCase(setData.fulfilled, (state, action) => {
      state.responseStatus = 'success';
      state.rows = action.payload.rows;
      state.columnNames = action.payload.columnNames;
    });
    builder.addCase(setData.rejected, (state, action) => {
      state.responseStatus = 'rejected';
      state.errorMessage = action.payload;
    });
  }
});

export const {
  updateContent,
  sort,
} = tableSlice.actions;


export default tableSlice.reducer;
