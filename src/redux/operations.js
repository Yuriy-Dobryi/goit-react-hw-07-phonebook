import axios from 'axios';
import { fetchingError, fetchingInProgress, fetchingSuccess } from './contactsSlice';


axios.defaults.baseURL = 'https://64abdf529edb4181202eb5c6.mockapi.io';
export const getContacts = () => async dispatch => {
  try {
    dispatch(fetchingInProgress());
    const response = await axios.get('/contacts');
    dispatch(fetchingSuccess(response.data));
  } catch (error) {
    dispatch(fetchingError(error.message));
  }
}