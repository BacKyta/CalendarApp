import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import { useCalendarStore, useUiStore } from '../../src/hooks';


export const useModalCalendar = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const { activeEvents, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
  
  
    const [formValues, setFormValue] = useState({
      title:'Kevin',
      notes: 'Herrera',
      start: new Date(),
      end: addHours( new Date(), 2)
    });
  
    const titleClass =  useMemo(() => {
  
      if ( !formSubmitted ) return '';
      return ( formValues.title.length > 0)
      ? ''
      : 'is-invalid';
  
    }, [formValues.title, formSubmitted]);
  
    //*Se vuelve a memorizar el valor si el titulo cambia o si el form submitted cambia
  
    //* Efectos

    useEffect(() => {
      
      if (activeEvents !== null) {
        setFormValue({
          ...activeEvents
        });
      }

    }, [activeEvents]);

    //* Manejadores
  
    const onInputChange = ({target}) =>{
    
      setFormValue({
        ...formValues,
        [target.name]: target.value
      });
    };
  
    const onDateChange =( event, changing) =>{
    
      setFormValue({
        ...formValues,
        end: addHours( event, 2),
        [changing]: event
      });
    };
  
  
    const oncloseModal = () => {

      closeDateModal();
      
    };
  
  
    const onSubmit = async (event) =>{
      event.preventDefault();
      setFormSubmitted(true);
  
      const difference = differenceInSeconds( formValues.end, formValues.start ); 
  
      if ( isNaN( difference )  || difference <= 0) {
        Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
        return;
      }
      if ( formValues.title.length <= 0) return;
  
      console.log( formValues );

      //* Guardar un nuevo evento y Cerrar el Modal

      await startSavingEvent( formValues );
      closeDateModal();
      setFormSubmitted(false);

      //* El startSaving setea el formValue del modal y lo setea al array de eventos(fechas creadas),
      //* y luego coloca el activeEvent en false pprque no hay nada activo en el modal
    };

    return{
      isDateModalOpen,
        ...formValues,
        oncloseModal,
        titleClass,
        onInputChange,
        onDateChange,
        onSubmit,
        closeDateModal

    };
};

//* El formValues es lo que se setea cuando se agrega una nuesva actividad en el calendario, ya que antes
//* de esto se seteo en el setActive, y este y esparcio ... en el setActive que es el estado del formulario
//* del modal, y asi se puede setear, 
//* Por eso tenemos el events, y el activeEvents que es el que se uso en el +