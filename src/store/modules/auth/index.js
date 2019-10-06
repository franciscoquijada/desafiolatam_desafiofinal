import { combineReducers } from 'redux';

import login from './login.reducer';


const rootReducer = combineReducers({
    auth: login,
});

export default rootReducer;