import  { Calendar }  from  'react-big-calendar';
import  addHours  from 'date-fns/addHours';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { NavBar } from '../components/Navbar';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';


const events = [{
  title  : 'Cumple de kevin',
  notes  : 'Hay que comprar torta',
  start  : new Date(),
  end    : addHours( new Date(), 2),
  bgColor: '#fafafa',
  user   : {
    _id: '123',
    name: 'Kevin'

  }
}];


export const CalendarPage = () => {

  

  const [lenguage, setLenguage] = useState(true);
  const [lenguageText, setLenguageText] = useState('English');

  const handleChangeLenguage = () => {
   setLenguage(current => !current);
   (lenguage) ?  setLenguageText( 'Español' ) : setLenguageText( 'English' );
  };

  const eventStyleGetter = ({ event, start, end, isSelected }) =>{

    console.log({event, start, end, isSelected });

    const style = {
      backgrpundColor: '#347cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color:'white'
    };

    return{
      style
    };
    
  };

  return (
    <>
      <NavBar handleChangeLenguage={ handleChangeLenguage } lenguageText={ lenguageText } />
        <Calendar
          culture={ lenguage && 'es' }
          localizer={localizer}
          events={ events }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px)' }}
          messages={ lenguage && getMessagesES() }
          eventPropGetter={ eventStyleGetter }
        />
    </>
  );
};

//* puede hcer warning con el archivo .map.css porque puede al importar pinesa uqe hay una contraparte
//* de typescript para poderlo mapear.