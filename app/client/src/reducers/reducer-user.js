import {SAVE_USER} from '../actions/actions';

const initialState = {
    userName: '',
    role: '',
    isLoggedIn: false
};


const user = (state = initialState, action) => { 
    switch (action.type) {
        case SAVE_USER :
            //return Object.assign({}, state, 
            state = {
                userName: action.obj.userName,
                role: action.obj.role,
                isLoggedIn: true
            };
            console.log(state);
            return state;
            
        default :
            return state;

        

    }
};
    
export default user;