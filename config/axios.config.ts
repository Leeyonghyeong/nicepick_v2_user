import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://3.38.51.90/api'
      : 'http://192.168.0.22:3001/api',
})

export default instance
