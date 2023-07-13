import ClipLoader from 'react-spinners/ClipLoader';
import { useFetchContactsQuery } from 'redux/phoneBookApi';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';

export function App() {
  const {
    data: contacts,
    isFetching: isLoading,
    isSuccess,
  } = useFetchContactsQuery();

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

        {isSuccess && contacts.length > 0 ? (
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

const spinWrapper = {
  display: 'block',
  margin: '0 auto 20px',
};