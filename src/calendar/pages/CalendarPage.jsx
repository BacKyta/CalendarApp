import { useEffect, useState } from 'react';
import  { Calendar }  from  'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore} from '../../hooks';


export const CalendarPage = () => {

  const { user } = useAuthStore();

  const{ openDateModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    // eslint-disable-next-line no-unused-vars
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  
    // eslint-disable-next-line no-unused-vars
    const eventStyleGetter = ( event, start, end, isSelected ) =>{
      // console.log(isSelected);
      //* Si el evento pertenece al usuario
      const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid);

      // console.log({event, start, end, isSelected });
  
      const style = {
        backgroundColor: isMyEvent ? '#347cf7' : '#465660',
        borderRadius: '0px',
        opacity: isSelected ? 1 : 0.8,
        color:'white'
      };
  
      return{
        style
      };
      
    };

  const [lenguage, setLenguage] = useState(true);
  const [lenguageText, setLenguageText] = useState('English');

  const handleChangeLenguage = () => {
   setLenguage(current => !current);
   (lenguage) ?  setLenguageText( 'Español' ) : setLenguageText( 'English' );
  };


const onDoblueClick = () =>{
  // console.log({doubleClick: event});
  openDateModal();
};


const onSelect = (event) =>{

  // console.log({click: event});

  setActiveEvent(event);

};

const onViewChange = (events) =>{
  // console.log({viewChange: event});
  localStorage.setItem('lastView', events);
};


//* Apenas se carge el componente se dispara el efecto, que es cargar las notas del usuario

useEffect(() => {
  startLoadingEvents();
}, []);

  return (
    <>
      <NavBar handleChangeLenguage={ handleChangeLenguage } lenguageText={ lenguageText } />
        <Calendar
          culture={ lenguage && 'es' }
          localizer={localizer}
          events={ events }
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px)' }}
          messages={ lenguage && getMessagesES() }
          eventPropGetter={ eventStyleGetter }
          components={ {
            event: CalendarEvent  
          }}
          onDoubleClickEvent={ onDoblueClick } //* lo que emita el click se manda como parametro, osea si evento
          onSelectEvent={ onSelect }
          onView={ onViewChange }
       
        />

        <CalendarModal/>
        <FabAddNew/>
        <FabDelete/>
    </>
  );
};

//* puede hcer warning con el archivo .map.css porque puede al importar pinesa uqe hay una contraparte
//* de typescript para poderlo mapear.

//* Personalizar el cuadro de eventos desde un componente le pasa propiedad del objeto
//* para tener mas personalizacion se crea un componente aparte y se pasa al calendario como
//* un componente, ahi se puede especificar todos los componentes o eventos que queremos sobreescribir 