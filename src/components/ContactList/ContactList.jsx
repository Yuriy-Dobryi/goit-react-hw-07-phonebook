import { useSelector } from 'react-redux';
import { Notify } from 'notiflix';

import { selectFilteredContacts } from 'redux/selectors';
import ContactItem from './ContactItem';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  if (contacts.length === 0) {
    Notify.info('No contacts with this name🤔');
  }
  
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}