import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const defaultPending = state => {
  state.isLoading = true;
};

const defaultRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: defaultPending,
    [fetchContacts.rejected]: defaultRejected,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.list = action.payload;
    },

    [addContact.pending]: defaultPending,
    [addContact.rejected]: defaultRejected,
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.list.push(action.payload);
    },

    [deleteContact.pending]: defaultPending,
    [deleteContact.rejected]: defaultRejected,
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.list = state.list.filter(
        contact => contact.id !== action.payload.id
      );
    },
  },
});

export const contactsReducer = contactsSlice.reducer;