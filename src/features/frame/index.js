import { combineReducers } from 'redux';

import location from './location';
import cart from './cart';
import snackbar from './snackbar';
import frame from './frame';

export default combineReducers({ location, cart, snackbar, frame });
