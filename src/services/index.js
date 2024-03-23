// axios interceptors
import axios from "axios";
import { WeatherURL } from "config";

/**
 * parse error response
 */
const parseError = (response) => {
  // console.log(response)
  // error
  if (response.error) {
    if (response.error.message) {
      return Promise.reject({ message: response.error.message });
      // return Promise.reject({ error: {message: response.error.message} })
    }
  } else {
    return Promise.reject({ error: {message: 'An error has occurred!'} });
  }
}

/**
 * parse response
 */
const parseBody = (response, store) => {
  // console.log(response);
  if (response.status === 200) {
    return response;
  } else {
    return this.parseError(response.data.messages);
  }
}

/**
 * axios instance
 */
export const WeatherMS = axios.create({
  baseURL: WeatherURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const interceptor = (store) => {
  // request header
  WeatherMS.interceptors.request.use((config) => {
    return config;
  }, error => {
    return Promise.reject(error);
  }, null)

  // response parse
  WeatherMS.interceptors.response.use((response) => {
    return parseBody(response, store);
  }, error => {
    console.warn('Error status', error.response.status);
    // return Promise.reject(error)
    if (error.response) { 
      return parseError(error.response.data);
    } else {
      return Promise.reject(error);
    }
  })
}