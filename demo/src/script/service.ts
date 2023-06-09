import axios from 'axios'

const API_URL = 'https://bpm.matthiasklenz.de' //'http://127.0.0.1:80' //

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
