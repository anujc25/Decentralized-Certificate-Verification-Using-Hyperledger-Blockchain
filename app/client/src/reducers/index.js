import { combineReducers } from 'redux'
import UserReducer from './reducer-user'
import UniversityViewUpdate from './reducer-updateUniversityView'
import StudentViewUpdate from './reducer-updateStudentView'

const allReducers = combineReducers({
  userDetail: UserReducer,
  universityViewUpdate: UniversityViewUpdate,
  studentViewUpdate:StudentViewUpdate
})

export default allReducers
