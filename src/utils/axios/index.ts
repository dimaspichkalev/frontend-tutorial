import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8889/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });