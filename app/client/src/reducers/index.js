import { combineReducers } from 'redux'
import UserReducer from './reducer-user'
import UniversityViewUpdate from './reducer-updateUniversityView'
import StudentViewUpdate from './reducer-updateStudentView'
import EmployerViewUpdate from './reducer-updateEmployerView'

const allReducers = combineReducers({
  userDetail: UserReducer,
  universityViewUpdate: UniversityViewUpdate,
  studentViewUpdate:StudentViewUpdate,
  employerViewUpdate:EmployerViewUpdate
})

export default allReducers
