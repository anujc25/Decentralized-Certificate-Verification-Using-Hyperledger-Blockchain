import { combineReducers } from 'redux'
import UserReducer from './reducer-user'
import UniversityViewUpdate from './reducer-updateUniversityView'

const allReducers = combineReducers({
  userDetail: UserReducer,
  universityViewUpdate:UniversityViewUpdate
})

export default allReducers
