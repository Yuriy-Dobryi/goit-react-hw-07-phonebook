import { Notify } from 'notiflix';
import { useSelector } from 'react-redux';
import { phoneBookApi } from 'redux/phoneBookApi';
import { selectFilter, getFilteredContacts } from 'redux/selectors';
import ContactItem from './ContactItem';

export default function ContactList() {
  const { data: contacts } = phoneBookApi.endpoints.fetchContacts.useQueryState();
  const filter = useSelector(selectFilter)

  const filteredContacts = getFilteredContacts(contacts, filter);
  if (filteredContacts.length === 0) {
    Notify.info('No contacts with this name🤔');
  }
  
  return (
    <ul>
      {filteredContacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}