import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import calendarApi from '../api/calendarAPi';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';


export const useCalendarStore = () =>{

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar);
    const { user } = useSelector( state => state.auth); //user autenticado, name y el uid

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent (calendarEvent));
        // console.log(activeEvent);
    };

    const startSavingEvent = async ( calendarEvent ) =>{
        console.log(user);
        //TODO : llegar al backend
        console.log(calendarEvent);
        // Todo bien
        try {

        if ( calendarEvent.id ) {
            
            //* Actualizando nota

            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

            dispatch( onUpdateEvent( {...calendarEvent, user} ) ); 
            // sobreescribios el usuario del store que se seteo al guardar
            return;
        }

        //* Creando
        //* Con la resp que recibimos del backend, mandamos los datos al a los dispatch para 
        //* setear la informacion

        const { data } = await calendarApi.post('/events', calendarEvent);
        console.log({data});

        dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user: user}) );

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg,'error');
        }

      
    
    };

    const startDeletingEvent = async () =>{
        //TODO : Llegar al backend

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch( onDeleteEvent());
            Swal.fire('Borrar nota', 'Borrado correctamente','success');
        } catch (error) {
            console.log(error);
            Swal.fire('Error al borrar', error.response.data.msg,'error');
        }
   
    };


    const startLoadingEvents = async () =>{
        
        try {
            
            const { data } = await calendarApi.get('/events');
            // console.log({data});

            //* Procesar la data convertilo a objetos JS

            const events = convertEventsToDateEvents(data.events);
            // console.log({events});
             dispatch(onLoadEvents(events)); 
            

        } catch (error) {
            console.log('cargando eventos');
            console.log(error);
        }

    };

    return{

        //* Propeties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents


    };
};