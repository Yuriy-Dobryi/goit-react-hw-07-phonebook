import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { selectContacts } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import { fetchContacts } from 'redux/operations';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';

const spinWrapper = {
  display: 'block',
  margin: '0 auto 20px',
};

export function App() {
  const { contacts, isLoading } = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const isContactsEmpty = contacts.length === 0;
    if (isContactsEmpty) {
      dispatch(setFilter(''));
    }
  }, [contacts, dispatch]);

  return (
    <div className="container">
      <div className={styles.phonebook}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm />
      </div>

      <div>
        <h2 className={styles.title}>Contacts:</h2>
        <ClipLoader
          loading={isLoading}
          cssOverride={spinWrapper}
          size={36}
          color={`#fff2e1`}
          aria-label="Loading Spinner"
        />

        {contacts.length > 0 ? (
          <>
            {!isLoading && <Filter />}
            <ContactList />
          </>
        ) : (
          !isLoading && <p>There are no contacts🧐</p>
        )}
      </div>
    </div>
  );
}