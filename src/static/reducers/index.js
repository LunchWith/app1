import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import cardReducer from './card';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    card: cardReducer,
    routing: routerReducer
});
