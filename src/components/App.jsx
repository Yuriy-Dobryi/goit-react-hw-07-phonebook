import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';

import { selectContacts } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import { getContacts } from 'redux/operations';
// import { setDefaultContacts } from "redux/contactsSlice";
import { DEFAULT_CONTACTS } from 'redux/constants';

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import styles from './App.module.css'

const override = {
  display: 'flex',
  justifyContent: 'center',
};

export function App() {
  const { contacts, isLoading, error } = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  // useEffect(() => {
  //   const isContactsEmpty = contacts.length === 0;

  //   if (isContactsEmpty) {
  //     dispatch(setFilter(''));
  //   }
  // }, [contacts, dispatch]);

  return (
    <div className="container">
      <div className={styles.phonebook}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm />
      </div>

      <div>
        <h2 className={styles.title}>Contacts</h2>
        <BeatLoader
          loading={isLoading}
          cssOverride={override}
          size={24}
          color={`#EA6DB1`}
          aria-label="Loading Spinner"
        />

        {contacts.length > 0 && (
          <>
            <Filter />
            <ContactList />
          </>
        )}

        {error && (
          <>
            <p>There is no contacts</p>
            <button
              className={styles.btn}
              // onClick={() => dispatch(setDefaultContacts(DEFAULT_CONTACTS))}
            >
              Default Contacts
            </button>
          </>
        )}
      </div>
    </div>
  );
}