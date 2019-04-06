const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
  'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
}

export const uploadStudentDiploma = (payload) =>
  fetch(`${api}/university/studentdiploma`, {
    method: 'POST',
    headers: {
      headers
      //  ...headers,
      // 'Content-Type': 'multipart/form-data'
    },
    body: payload
  })
    .then(res => res.json())
    .then(res => {
      return res
    }).catch(error => {
      console.log('This is error', error)
      return error
    })

export const downloadStudentDiploma = (hash) =>
  fetch(`${api}/diploma/download/${hash}`, {
    method: 'GET',
    headers: {
      headers
    //  ...headers,
    // 'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => res.json())
    .then(res => {
      return res
    }).catch(error => {
      console.log('This is error', error)
      return error
    })
