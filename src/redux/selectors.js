export const selectContacts = state => state.contacts.list;

export const selectFilter = state => state.filter;

export const selectFilteredContacts = state => {
  const contacts = selectContacts(state);
  const filter = selectFilter(state);

  if (filter) {
    const lowerCaseFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseFilter)
    );
    return filteredContacts;
  }
  return [...contacts];
}