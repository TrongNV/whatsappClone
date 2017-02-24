import { combineReducers } from 'redux';
import FavoriteReducers from './FavoriteReducers';
import ContactSearchReducers from './ContactSearchReducers';

export default combineReducers({
    contacts: FavoriteReducers,
    contactsGroup: ContactSearchReducers,
});
