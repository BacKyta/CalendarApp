import { useState } from 'react';
import  { Calendar }  from  'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore} from '../../hooks';


export const CalendarPage = () => {

  const{ openDateModal } = useUiStore();

  const { events, setActiveEvent, activeEvents } = useCalendarStore();

    // eslint-disable-next-line no-unused-vars
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  
    // eslint-disable-next-line no-unused-vars
    const eventStyleGetter = ( event, start, end, isSelected ) =>{
  
      // console.log({event, start, end, isSelected });
  
      const style = {
        backgroundColor: '#347cf7',
        borderRadius: '0px',
        opacity: 0.8,
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


const onDoblueClick = (event) =>{
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