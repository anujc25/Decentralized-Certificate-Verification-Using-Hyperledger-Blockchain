import { UPDATE_UNIVERSITY_VIEW} from '../actions/actions'

const initialState = {"view":"Dashboard"}

const updateUniversityView = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UNIVERSITY_VIEW :
      console.log("Inside University view Reudcer")
      
      state = action.obj
      console.log(state)

      return state

    default :
      return state
  }
}

export default updateUniversityView
