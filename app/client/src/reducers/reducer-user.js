import { SAVE_USER, SAVE_EMAILIDS } from '../actions/actions'

const initialState = {
  userName: '',
  role: '',
  isLoggedIn: false,
  emailIds: '',
  firstName: '',
  lastName: ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER :
      // return Object.assign({}, state,
      state = {
        userName: action.obj.userName,
        firstName: action.obj.firstName,
        lastName: action.obj.lastName,
        role: action.obj.role,
        isLoggedIn: true,
        emailIds: state.emailIds
      }
      console.log('REDUCER STATE', state)
      return state

    case SAVE_EMAILIDS :
      // return Object.assign({}, state,
      state = {
        ...state,
        emailIds: action.obj.emailIds
      }
      console.log(state)
      return state

    default :
      return state
  }
}

export default user
