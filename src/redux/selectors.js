import { createSelector } from '@reduxjs/toolkit';
import { phoneBookApi } from './phoneBookApi';

export const selectFilter = state => state.filter;

const selectFetchResult = phoneBookApi.endpoints.fetchContacts.select();

const selectContacts = createSelector(selectFetchResult, result => result.data);

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
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