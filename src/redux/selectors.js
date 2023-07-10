import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => ({
  contacts: state.contacts.list,
  isLoading: state.contacts.isLoading,
  error: state.contacts.error,
});
export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  ({contacts}, filter) => {
    if (filter) {
      const lowerCaseFilter = filter.toLowerCase();
      const filteredContacts = contacts.filter(({ name }) =>
        name.toLowerCase().includes(lowerCaseFilter)
      );
      return filteredContacts;
    }
    return [...contacts];
  }
);