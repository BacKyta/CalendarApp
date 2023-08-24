/* eslint-disable no-undef */

import { renderHook } from '@testing-library/react';
import { useUiStore } from '../../src/hooks/useUiStore';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../../src/store';
import { act } from 'react-dom/test-utils';

const getMockStore = ( initialState ) =>{
    return configureStore({
        reducer:{
            ui: uiSlice.reducer
        },
        preloadedState:{
            ui: {...initialState}
        }
    });
};


describe('Pruebas en useUiStore', () => {
    
    test('debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({ isDateModalOpen: false});
        //* con esto cambio el estado precargado del slice

        const {result}= renderHook( () => useUiStore(),{
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        //* renderizamos el hook, usamos el wrapper para envolver el hook, este se dispara con una
        //* funcion que devuelve un jsx, esete jsx renderiza el provider con el store que utliza 
        //* el hook, el hook esta envuelto dentro de este providder por eso es que toma el store

        // console.log(result);
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        }); 

        //* Aqui no funciona el provider porque es para jsx y esto es js, para esto se usa el wrapper
    });

    test('debe de colocar true en el isDataModelOpen', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: false});
   
        const {result}= renderHook( () => useUiStore(),{
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        const { isDateModalOpen, openDateModal} = result.current;
        console.log(result.current);

        //* al ser primitivo amntiene su valor de false porque en este momento el resultado setea false

        act( () => {
            openDateModal();
        });


        //* al llamar la acciuon cambia el valor de sesult current en este momento lo setea
        //* y en el current el valor es true despues de la accion pero el valor anterior a este es false
        //? tener cuidado con estos valores

        console.log({result: result.current, isDateModalOpen});

        expect(result.current.isDateModalOpen).toBeTruthy();
    });


    test('closeDateModal debe de colcoar false en isDateModalOpes', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: false});
   
        const {result}= renderHook( () => useUiStore(),{
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        act( () => {
           result.current.closeDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

    });

    test('toggleDateModal debe de cambiar el estado respectivamente', () => {
        
        const mockStore = getMockStore({ isDateModalOpen: true});
   
        const {result}= renderHook( () => useUiStore(),{
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        act( () => {
           result.current.toggleDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

    });
});