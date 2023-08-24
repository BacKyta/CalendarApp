/* eslint-disable no-undef */

import { renderHook, waitFor } from '@testing-library/react';
import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { testUserCredentials } from '../fixtures/testUser';
import calendarApi from '../../src/api/calendarAPi';

const getMockStore = (initialState) =>{
    return configureStore({
        reducer:{
            auth: authSlice.reducer
        },
        preloadedState:{
            auth:{...initialState}
        }
    });
};

describe('Pruebas en el useAuthStore', () => {

    //* antes que cualquieara de las funciones del test llama el 

    beforeEach( () => localStorage.clear());
    
    test('debe de regresar los eventos por defecto', () => {
       
        const mockStore = getMockStore({ ...initialState });
        
        const {result} = renderHook( () => useAuthStore(),{
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        // console.log(result.current);

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        });
        //* Con que se pruebeque sean funciones etsa bien y que esten definidsa, mas adelante
        //* se probara que cada una como el login o register tenga sus arguementos.

    });


    test('startLogin debe de realizar el login correctamente',async () => {
        
        
        //* se limpia porque puedira que otra prueba haya grabador el tokene o el initDate del token

        const mockStore = getMockStore({ ...notAuthenticatedState });
        
        const {result} = renderHook( () => useAuthStore(),{
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        //* aqui podriamos validar que paso por cheacking de manera sincrona envienado el starLogin

        await act(async() =>{
           await  result.current.startLogin( testUserCredentials );
        });

        // console.log(result);
        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status:'authenticated',
            user:{ uid: '64d95b2fd82a595ca9ec12a0', name: 'test-User'}
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));


        //* Se usa el await porque es una funcion asincrona la del startLogin
    });

    test('startLogin debe de fallar la autenticacion', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        
        const {result} = renderHook( () => useAuthStore(),{
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        await act(async() =>{
            await  result.current.startLogin({email:'algo@correo.com', password: '121121'} );
        });

        const{ errorMessage, status, user } = result.current;

        // console.log({errorMessage, status, user});

        expect(localStorage.getItem('token')).toBe(null);

        expect( {errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: {}
        });

        //* plorque tiene que esperar a que se ejecute el settimeout que limpia el error message
        await waitFor( 
            () => expect( result.current.errorMessage ).toBe(undefined)
        );
    });


    test('debe de crear un usuario el startRegister', async () => {
        
        const newUser= {
            email:'algo@correo.com',
             password: '121121',
              name:'test-user2'
        };

        const mockStore = getMockStore({ ...notAuthenticatedState });
        
        const {result} = renderHook( () => useAuthStore(),{
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        //* espia sobre calendarApi para evitar que la peticion post se haga, solo en esta prueba
        //* esta va ser la respuesta cuando el CalendarApi se dispara al hacer un post (registar)
        //* esto evita el mock de arriba para que salga error en los otros test del login


        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data:{
                'ok': true,
                'uid': '3242314123512',
                'name': 'test-User',
                'token': 'TOKEN'
            }   
        });

        await act(async() =>{
            await  result.current.startRegister( newUser );
        });

        const { errorMessage, status, user} = result.current;
        // console.log({errorMessage, status, user});

        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'test-User', uid: '3242314123512' }
        });

        //* esto destruye el spia , si es que usamos el post en otra prueba, que pasa por el mock
        //* y pueda llegar al backend traquilamente si es necesario.
        spy.mockRestore();
    });

    test('startRegister debe de fallar en la creacion', async () => {

        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        
        const {result} = renderHook( () => useAuthStore(),{
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        await act(async() =>{
            await  result.current.startRegister( testUserCredentials );
        });

        const { errorMessage, status, user} = result.current;
        // console.log({errorMessage, status, user});

        expect({errorMessage, status, user}).toEqual({
            errorMessage: 'Usuario ya existe con ese correo',
            status: 'not-authenticated',
            user: {}
        });
        
    });

    test('checkAuthToken debe de falar si no hay un token',async () => {

        const mockStore = getMockStore({ ...initialState });
        
        const {result} = renderHook( () => useAuthStore(),{
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        // console.log('token', localStorage.getItem('token'));  //null

        await act(async() =>{
            await  result.current.checkAuthToken();
        });

        const{ errorMessage, status, user } = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user:{}
        });

    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async () => {

        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem( 'token', data.token );

        const mockStore = getMockStore({ ...initialState });
        
        const {result} = renderHook( () => useAuthStore(),{
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        // console.log('token', localStorage.getItem('token'));  //null

        await act(async() =>{
            await  result.current.checkAuthToken();
        });

        const { errorMessage, status, user} = result.current;
        // console.log({ errorMessage, status, user });

        expect({errorMessage, status, user}).toEqual({
           errorMessage: undefined,
           status: 'authenticated',
           user: { name: 'test-User', uid: '64d95b2fd82a595ca9ec12a0' }
        });

        
    });
});