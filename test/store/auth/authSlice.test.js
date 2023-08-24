/* eslint-disable no-undef */

import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('pruebas en authSlice', () => {

    test('debe de regresar el estado incial', () => {
        
        expect( authSlice.getInitialState()).toEqual(initialState);

    });

    test('debe de realizar un login', () => {
        
        const state = authSlice.reducer(initialState, onLogin( testUserCredentials ));
        // console.log(state);
        expect(state).toEqual({
            status      : 'authenticated',
            user        : testUserCredentials,
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout', () => {
        
        const state = authSlice.reducer(initialState, onLogout());
        // console.log(state);
        expect(state).toEqual({
            status      : 'not-authenticated',
            user        : {},
            errorMessage: undefined
        });
    });

    test('debe de realizar el logout con algun mensajes', () => {
        
        const errorMessage = 'credential no valid';
        const state = authSlice.reducer(initialState, onLogout( errorMessage ));
        // console.log(state);
        expect(state).toEqual({
            status      : 'not-authenticated',
            user        : {},
            errorMessage: errorMessage
        });
    });

    test('debe de limpiar el erroMessage', () => {
        
        const errorMessage = 'credential no valid';
        const state = authSlice.reducer(initialState, onLogout( errorMessage ));
        const newState = authSlice.reducer(state, clearErrorMessage());

        expect( newState.errorMessage ).toBe(undefined);
   
    });

    test('debe setear el estado en Onchecking', () => {
        
        const state = authSlice.reducer(initialState, onChecking());
        console.log(state);

        expect( state ).toEqual({
            status: 'checking',
            user: {}, 
            errorMessage: undefined
        });
   
    });    
});