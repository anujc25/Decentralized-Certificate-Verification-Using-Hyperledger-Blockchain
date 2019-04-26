import { UPDATE_EMPLOYER_VIEW} from '../actions/actions'

const initialState = {"view":"Dashboard"}

const updateEmployerView = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYER_VIEW:
      console.log("Inside Employer view Reudcer")
      
      state = action.obj
      console.log(state)

      return state

    default :
      return state
  }
}

export default updateEmployerView
