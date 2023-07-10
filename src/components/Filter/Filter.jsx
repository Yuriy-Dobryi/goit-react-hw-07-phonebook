import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import stylesApp from '../App.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <input
        className={stylesApp.input}
        onChange={({ target }) => dispatch(setFilter(target.value))}
        placeholder="Find contacts by name"
        name="filter"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      />
    </>
  );
}