import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import dataReducer from './data';
import cardReducer from './card';
import replyReducer from './reply';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    card: cardReducer,
    reply: replyReducer,
    routing: routerReducer,
    form: formReducer,
});
