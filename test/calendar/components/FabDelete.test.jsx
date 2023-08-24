/* eslint-disable no-undef */

import { fireEvent, render,screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { Provider } from 'react-redux';
import { store } from '../../../src/store';
import { useCalendarStore } from '../../../src/hooks/useCalendarStore';

//* Hacemos mock del hook que se usa en FabDelte
jest.mock('../../../src/hooks/useCalendarStore');



describe('Pruebas en el componente FabDelete', () => {

    //* antes que cualquieara de las funciones del test llama el limpiar todos los mocks

    const mockStartDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
    beforeEach( () => jest.clearAllTimers() );
    
    test('debe de mostrar el componente correctamente', () => {
        //* retorna falso para que se pueda hacer las acerciones, manda el falso al mock del
        //* hook y en el Fab lo utiliza por lo que que destructura su valor es false
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });

        render(
        <Provider store={ store }>
            <FabDelete/>
        </Provider>
        );
            
        // screen.debug();

        const btn = screen.getByTestId('btn-delete');

        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.classList ).toContain('fab-danger');
        expect( btn.style.display ).toBe('none');

    });

    test('debe de mostrar el boton su hay un evento activo', () => {
    
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });

        render(
        <Provider store={ store }>
            <FabDelete/>
        </Provider>
        );
            
        // screen.debug();

        const btn = screen.getByTestId('btn-delete');
        expect( btn.style.display ).toBe('');

    });


    test('debe de llamar startDeletingEvento si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render(
        <Provider store={ store }>
            <FabDelete/>
        </Provider>
        );
        //* no muestra el style porque no existe, react al ver que el display no tiene contenido
        //* ignora la propiedad y no la renderiza o muestra

        screen.debug();

        const btn = screen.getByTestId('btn-delete');
     
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalledWith();

    });



});










//* testing library se enfoca a probar como queda el resultado despues de las modificaciones o eventos
//* clickcs cualquier otra cosa que suceda en pantalla

