import axios from 'axios'

const API_URL = 'http://127.0.0.1:80'//'https://bpm.matthiasklenz.de'

const config = {
    baseURL: API_URL,
    timeout: 120000,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

const service = axios.create(config)
const token = "token"

service.interceptors.request.use(
    async (config) => {
        // Add X-Access-Token header to every request, you can add other custom headers here
        config.headers!.Authorization = `Bearer ${token}`
        //with this header cors request will fail, why? idk!
        //config.headers = {
        //  'Access-Control-Allow-Origin': '*',
        //}
        return config
    }
    // Add Error Handler Below
)


export default service
