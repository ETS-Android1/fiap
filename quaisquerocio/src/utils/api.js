import axios from 'axios';

const api = () => {
    const defaultOptions = {
      //baseURL: 'http://192.168.0.109:8080/api/',
      baseURL: 'https://quaisquerocio.herokuapp.com/api/',
    };
  
    // Create instance
    let instance = axios.create(defaultOptions);
  
    // Set the AUTH token for any request
    //tratar para  para depois redirecionar caso token esteja vazio
    instance.interceptors.request.use(function (config) {
      //const token = localStorage.getItem('token');
      //config.headers.Authorization =  token ? `Bearer ${token}` : '';
      return config;
    });
  
    return instance;
  };
  
  export default api();