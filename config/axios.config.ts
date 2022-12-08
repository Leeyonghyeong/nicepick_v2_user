import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: 'http://192.168.0.22:3001/api',
})

export default instance
