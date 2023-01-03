import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://3.37.27.220/api'
      : // : 'http://192.168.45.130:3001/api',
        // 'http://localhost:3001/api',
        'http://192.168.0.22:3001/api',
})

export default instance
