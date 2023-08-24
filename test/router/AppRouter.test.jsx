/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';
import { store } from '../../src/store';
import { Provider } from 'react-redux';




jest.mock('../../src/hooks/useAuthStore');

//* Con este mock en ves de renderizar toda la pagina de calendarPage que tiene hooks
//* por eso salia errorm renderizaremos este mock, asi evitamos renderizar todo el componente
//* que contiene hooks custom y daria errores.

jest.mock('../../src/calendar',() =>({
    // eslint-disable-next-line no-unused-labels
    CalendarPage :  () => <h1>CalendarPage</h1>
}));


describe('Pruebas en AppRouter', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks());

    test('debe de mostrar la pantalla de carga y llama checkAuthToeken ', () => {
        
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render( 
            <Provider store={store}>

                <AppRouter/>
            </Provider>
        );
        screen.debug();

        expect( screen.getByText('Cargando....')).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();
    });


    //? Probar para provider otro tipo de test

    // test('debe de mostrar el login en casi de no estar autenticado', () => {
        
    //     useAuthStore.mockReturnValue({
    //         status: 'not-authenticated',
    //         checkAuthToken: mockCheckAuthToken
    //     });

    //     const {constiner} = render( 

    //         <MemoryRouter initialEntries='/auth2/algo/otracosa'>
    //             <AppRouter/>
    //         </MemoryRouter>
    //         //* hacer el test para el routerProvider con el router
    //     );

    //     screen.debug();
    //     expect( screen.getByText('Ingreso')).toBeTruthy();
    //     expect( constiner).toMatchSnapshot();

    // });

    test('debe de mostrar el calendario si estamos autenticados', () => {
        
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render( 
            <Provider store={store}>
                <AppRouter/>
            </Provider>  
        );

        screen.debug();

        expect( screen.getByText('CalendarPage')).toBeTruthy();

    });

    //? Probar el FabAddNew 

});