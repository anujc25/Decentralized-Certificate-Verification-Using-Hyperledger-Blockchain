import {combineReducers} from 'redux';
import UserReducer from './reducer-user';


const allReducers = combineReducers({
    userDetail: UserReducer
});

export default allReducers;