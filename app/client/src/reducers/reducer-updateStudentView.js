import { UPDATE_STUDENT_VIEW} from '../actions/actions'

const initialState = {"view":"Dashboard"}

const updateStudentView = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STUDENT_VIEW :
      console.log("Inside Student view Reudcer")
      
      state = action.obj
      console.log(state)

      return state

    default :
      return state
  }
}

export default updateStudentView
