import { SAVE_USER, SAVE_EMAILIDS } from '../actions/actions'

const initialState = {
  userName: '',
  role: 'UNIVERSITY',
  isLoggedIn: false,
  emailIds: ''
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER :
      // return Object.assign({}, state,
      state = {
        userName: action.obj.userName,
        role: action.obj.role,
        isLoggedIn: true,
        emailIds: state.emailIds
      }
      console.log(state)
      return state

    case SAVE_EMAILIDS :
      // return Object.assign({}, state,
      state = {
        userName: state.userName,
        role: state.role,
        emailIds: action.obj.emailIds
      }
      console.log(state)
      return state

    default :
      return state
  }
}

export default user
