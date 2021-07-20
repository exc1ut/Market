// First we need to import axios.js
import axios from 'axios';
import { apiAddress } from './app';
// Next we make an 'instance' of it
export const api = axios.create({
  // .. where we make our configurations
  baseURL: `http://${apiAddress}`,
});
