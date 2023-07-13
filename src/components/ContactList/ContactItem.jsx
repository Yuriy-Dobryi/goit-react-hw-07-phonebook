import { useDispatch } from 'react-redux';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

import { phoneBookApi, useDeleteContactMutation } from 'redux/phoneBookApi';
import { setFilter } from 'redux/filterSlice';
import styles from './ContactList.module.css';

export default function ContactItem({ contact: { id, name, number } }) {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const { data: contacts } =
    phoneBookApi.endpoints.fetchContacts.useQueryState();
  const dispatch = useDispatch();

  function removeContactHandle(id, name) {
    deleteContact(id);
    Notify.success(`${name} has been removed`);

    if (contacts.length - 1 === 0) {
      Notify.info('You deleted all contacts🙄');
      dispatch(setFilter(''));
    }
  }

  return (
    <li className={styles.item}>
      <p className={styles.info}>{name}</p>
      <p className={styles.info}>{number}</p>
      <button
        className={styles.btn}
        onClick={() => removeContactHandle(id, name)}
        disabled={isDeleting}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};