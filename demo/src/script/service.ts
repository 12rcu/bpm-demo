import axios from 'axios'

const API_URL = 'https://bpm.matthiasklenz.de'

const config = {
  baseURL: API_URL,
  timeout: 120000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}

const service = axios.create(config)
export default service
