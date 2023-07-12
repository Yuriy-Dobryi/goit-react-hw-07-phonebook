import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

import { phoneBookApi, useDeleteContactMutation } from 'redux/phoneBookApi';
import styles from './ContactList.module.css';

export default function ContactItem({ contact: { id, name, number } }) {
  const { data: contacts } =
    phoneBookApi.endpoints.fetchContacts.useQueryState();
  const [deleteContact] = useDeleteContactMutation();

  function removeContactHandle(id, name) {
    Notify.success(`${name} has been removed`);
    if (contacts.length - 1 === 0) {
      Notify.info('You deleted all contacts🙄');
    }
    deleteContact(id);
  }

  return (
    <li className={styles.item}>
      <p className={styles.info}>{name}</p>
      <p className={styles.info}>{number}</p>
      <button
        className={styles.btn}
        onClick={() => removeContactHandle(id, name)}
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