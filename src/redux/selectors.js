export const selectFilter = state => {
  return state.filter;
};

export const getFilteredContacts = (contacts, filter) => {
  if (filter) {
    const lowerCaseFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerCaseFilter)
    );
    console.log(filteredContacts);
    return [...filteredContacts];
  }
  return [...contacts];
};