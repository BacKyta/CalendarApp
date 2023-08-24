/* eslint-disable no-undef */

import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';

describe('Pruebas en el uiSlice', () => {
    
    test('debe de rehresar el estado por defecto', () => {
        console.log(uiSlice.getInitialState());
        
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false});
    });


    test('debe de cambiar el isDateModalOpen correctamente', () => {

        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal());
        // console.log(state);
        expect(state.isDateModalOpen).toBeTruthy();

        
        state = uiSlice.reducer( state, onCloseDateModal());
        // console.log(state);
        expect(state.isDateModalOpen).toBeFalsy();

    });
});