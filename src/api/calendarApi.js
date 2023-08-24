//? Instancia de Axios Config

import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

//TODO: Configurar interceptores
//* Envia informacion header (token actual ) para la revalidacion del token

calendarApi.interceptors.request.use( config =>{

    config.headers={
        ...config.headers,
        'x-token': localStorage.getItem('token') // is no hay toeken manda undefined
    };

    //retorna onfig modificada
    // console.log(config);
    return config;
});

export default calendarApi;


//* permiten interceptar peticiones antes o despues de que se haga y aniadir o modificar la respuesta 
//* o aniadir y modificar informacion a la peticion.
//* Intercepta las peticion que van al backend o las que regresan, seusa un interceptor a la hora de hacer 
//* un request