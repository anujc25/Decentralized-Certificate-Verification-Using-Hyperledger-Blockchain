// const backendApi = process.env.REACT_APP_CONTACTS_API_URL || 'http://ec2-54-188-150-182.us-west-2.compute.amazonaws.com:8080'
const backendApi = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
}

export const allStudentEmailIds = (payload) =>
  fetch(`${backendApi}/students/email/` + payload.username, {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      return res
    }).catch(error => {
      console.log('This is error', error)
      return error
    })

export const addStudentEmailId = (payload) =>
  fetch(`${backendApi}/students/email/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => {
      return res
    }).catch(error => {
      console.log('This is error', error)
      return error
    })
