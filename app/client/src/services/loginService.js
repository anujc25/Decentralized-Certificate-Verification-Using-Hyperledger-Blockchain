const centralAPI = process.env.REACT_APP_CONTACTS_API_URL || 'http://ec2-13-52-182-144.us-west-1.compute.amazonaws.com:8080'
const localAPI = 'http://localhost:3001'

const headers = {
  'Accept': 'application/json'
}

export const universityLogin = (payload) =>
  fetch(`${centralAPI}/universities/login`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => {
      return res
    }).catch(error => {
      console.log('This is error' + error)
      return null
    })

export const studentLogin = (payload) =>
  fetch(`${centralAPI}/students/login`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => {
      return res
    }).catch(error => {
      console.log('This is error' + error)
      return error
    })

export const employerLogin = (payload) =>
  fetch(`${centralAPI}/verifiers/login`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => {
      return res
    }).catch(error => {
      console.log('This is error' + error)
      return error
    })

export const blockchainLogin = (payload) =>
  fetch(`${localAPI}/login/university`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if (!res.error && res.result && res.result.role) {
        return true
      }
      return false
    }).catch(error => {
      console.log('This is error' + error)
      return false
    })
