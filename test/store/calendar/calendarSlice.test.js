/* eslint-disable no-undef */

import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarActiveWithEventState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => {
    
    test('debe de regresar el estado por defecto', () => {
        
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
    });

    test(' onSetActiveEvent debe de activar el evento', () => {
        
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        // console.log(state);

        expect(state.activeEvent).toEqual(events[0]);
        
    });

    test('onAddNewEvent debe de agregar el evento', () => {
        
        const newEvent = {
            id: '3',
            start  : new Date('2023-01-15 14:00:00'),
            end    : new Date('2023-01-15 16:00:00'),
            title  : 'Cumple de papa',
            notes  : 'Alguna nota',

        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ));
        // console.log(state);

        expect( state.events).toEqual([ ...events, newEvent ]);
    });

    test('onUpdateEvent debe de agregar el evento', () => {
        
        const updatedEvent = {
            id: '2',
            start  : new Date('2023-01-15 14:00:00'),
            end    : new Date('2023-01-15 16:00:00'),
            title  : 'Cumple de tio alberto',
            notes  : 'Alguna nota!!',

        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ));
        // console.log(state);

        expect( state.events ).toContain( updatedEvent );
    });

    test('onDeleteEvent debe de borrar el evento activo', () => {
        
        const state = calendarSlice.reducer( calendarActiveWithEventState, onDeleteEvent());
        // console.log(state);

        expect( state.events ).not.toContain(events[0]);
        expect( state.activeEvent ).toBe( null );

    });

    test('onLoadEvent debe de establecer los eventos', () => {

        const newEvent = {
            id: '4',
            start  : new Date('2023-01-15 14:00:00'),
            end    : new Date('2023-01-15 16:00:00'),
            title  : 'Cumple de tio juan',
            notes  : 'Alguna nota!!',

        };
        
        const dbEvents = [...events, newEvent];
        // console.log(dbEvents);
        const state = calendarSlice.reducer( calendarWithEventsState, onLoadEvents( dbEvents ));
        console.log(state);
        
        expect( state.events ).toStrictEqual( dbEvents );
        expect( state.isLoadingEvents ).toBe( false );

        //* Si no se cumple o el .some esta en falso porque hay id iguales de la base de datos y el local

        const newState = calendarSlice.reducer( state, onLoadEvents( dbEvents ));
        console.log(newState);
        expect( newState.events.length ).toBe( dbEvents.length );

    });

    test('onLogoutCalendar debe de limpiar el estado', () => {
       
        const state = calendarSlice.reducer( calendarActiveWithEventState, onLogoutCalendar());

        console.log(state);

        expect(state).toStrictEqual( initialState );
        expect(state.isLoadingEvents).toBe(true);
        expect(state.events).toEqual([]);
        expect(state.activeEvent).toBe(null);
    });
});