
import { createSlice } from '@reduxjs/toolkit';


// const tempEvent = {
//     _id: new Date().getTime(),
//     title  : 'Cumple de kevin',
//     notes  : 'Hay que comprar torta',
//     start  : new Date(),
//     end    : addHours( new Date(), 2),
//     bgColor: '#fafafa',
//     user   : {
//     _id: '123',
//     name: 'Kevin'
//     }
// };


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState:{
    isLoadingEvents: true,
    events: [ 
        // tempEvent 
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: ( state, {payload}) =>{
        state.activeEvent = payload;
    },
    onAddNewEvent: ( state, { payload } ) =>{
      state.events.push( payload );
      state.activeEvent = null;
    },
    onUpdateEvent: ( state, {payload}) =>{
      state.events = state.events.map( event => {

        if ( event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: ( state ) =>{
      if (state.activeEvent) {
        state.events = state.events.filter( event => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
     
    },
    //* establecer eventos que vienen del backend
    onLoadEvents: (state, { payload = [] }) =>{

      state.isLoadingEvents = false;
      // state.events = payload;
      
      //* Compara los eventos locales del estado actual con los que se manda del payload que son
      //* lo que se llaman de la bd y los setea si no son los mismos.

      payload.forEach( event => {

          const exists = state.events.some( dbEvent => dbEvent.id === event.id );

          if (!exists) {
            state.events.push( event );
          }
      });

    },
    onLogoutCalendar: ( state ) =>{
      state.isLoadingEvents =  true,
      state.events = [],
      state.activeEvent = null;
    }
    
  }
});

export const { 
onSetActiveEvent, 
onAddNewEvent, 
onUpdateEvent, 
onDeleteEvent, 
onLoadEvents, 
disablesactiveEvent,
onLogoutCalendar} = calendarSlice.actions;

