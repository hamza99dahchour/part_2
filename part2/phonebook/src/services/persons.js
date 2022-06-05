import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (nameobject) => {
  const request = axios.post(baseUrl,nameobject)
  return request.then(response => response.data)
}

const update = (id, newobject) => {
  const request = axios.put(baseUrl+`/`+newobject.id,newobject)
  return request
  .then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll, create, update, remove 
}