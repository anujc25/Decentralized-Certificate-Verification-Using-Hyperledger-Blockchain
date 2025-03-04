const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
  'Accept': 'application/json'
}

export const allUniversityDiplomas = (payload) =>
  fetch(`${api}/university/studentdiploma/` + payload.username, {
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

export const allStudentDiplomas = (payload) =>
  fetch(`${api}/student/diploma/` + payload.username + `/` + payload.emailIds, {
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

export const allEmployerDiplomas = (payload) =>
  fetch(`${api}/employer/diploma/` + payload.username, {
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
