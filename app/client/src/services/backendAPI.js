const backendApi = process.env.REACT_APP_CONTACTS_API_URL || 'http://ec2-13-52-182-144.us-west-1.compute.amazonaws.com:8080'
// const backendApi = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

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


export const updatePassword = (url,payload) =>
  fetch(`${backendApi+url}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.body)
  })
  .then(res => {
    return res
  }).catch(error => {
    console.log('This is error', error)
    return error
  })


export const registerUser = (payload) => {
  var route = ""
  if (payload.role == "STUDENT") {
    route = `${backendApi}/students/`
  }
  else if (payload.role == "EMPLOYER") {
    route = `${backendApi}/verifiers/`
  }
  fetch(route, {

    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload.body)
  })
  .then(res => res.json())
  .then(res => {
    return res
  }).catch(error => {
      console.log('This is error', error)
      return error
    })
  }


