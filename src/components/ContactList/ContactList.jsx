import { useEffect } from 'react';
import { Notify } from 'notiflix';
import { useSelector } from 'react-redux';

import { selectFilteredContacts } from 'redux/selectors';
import ContactItem from './ContactItem';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  useEffect(() => {
    if (contacts.length === 0) {
      Notify.info('No contacts with this name🤔');
    }
  }, [contacts]);

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}