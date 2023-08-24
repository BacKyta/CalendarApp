/* eslint-disable no-undef */

import calendarApi from '../../src/api/calendarAPi';

describe('Pruebas en el calendar API', () => {
    
    test('debe de tener la configuracion por defecto', () => {

        // console.log(calendarApi);   

        expect( calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
        
    });

    test('debe de tener el x-token en el header de todas las peticiones ', async () => {

        const token = 'ABC-SDDA-221';
        localStorage.setItem('token', 'ABC-SDDA-221');

        const res = await calendarApi.get('/auth'); 

        //* no importa la ruta lo que importa es que venga ne el header el xtoken, esto es gracias al
        //* interceptor porque setea el xtoken en todas las peticiones que se hagan

        // console.log(res);
        // console.log(res.config.headers['x-token']);
        //* al ser una propiedad computada se accede con el []


        expect(res.config.headers['x-token']).toBe( token );

    });
});