import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.list = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.list = [];
      state.error = action.payload;
      console.log(state.error);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;