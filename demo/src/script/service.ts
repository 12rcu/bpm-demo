import axios from 'axios'

const API_URL = 'http://127.0.0.1:80' //'https://bpm.matthiasklenz.de' //

const config = {
  baseURL: API_URL,
  timeout: 120000
}

export const service = axios.create(config)

service.interceptors.request.use(async (config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export default service
