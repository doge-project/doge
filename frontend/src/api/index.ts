import Axios from 'axios';
import Config from 'react-native-config';

const API = Axios.create({
  baseURL: Config.API_URL,
});

export default API;
