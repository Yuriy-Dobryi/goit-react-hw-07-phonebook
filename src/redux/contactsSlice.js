import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const extraActions = [fetchContacts, addContact, deleteContact];

const getActions = (type) => extraActions.map(action => action[type]);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.list = state.list.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addMatcher(
        isAnyOf(...getActions('fulfilled')),
        state => {
          state.isLoading = false;
          state.error = null;
        })
      .addMatcher(
        isAnyOf(...getActions('pending')),
        state => {
          state.isLoading = true;
        })
      .addMatcher(
        isAnyOf(...getActions('rejected')),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }),
});

export const contactsReducer = contactsSlice.reducer;