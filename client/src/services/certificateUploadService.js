const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
  'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
}

export const uploadstudentcertificate = (payload) =>
  fetch(`${api}/university/studentcertificate`, {
    method: 'POST',
    headers: {
      headers
      //  ...headers,
      // 'Content-Type': 'multipart/form-data'
    },
    body:payload
  })
    .then(res => res.json())
    .then(res => {
      return res
    }).catch(error => {
      console.log('This is error' + error)
      return error
    })
