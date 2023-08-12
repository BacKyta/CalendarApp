
import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useModalCalendar } from '../../hooks/useModalCalendar';


registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); //* donde se colocara el modal, osea en root html

export const CalendarModal = () => {

  const { isDateModalOpen,
          start,
          end,
          title,
          notes,
          oncloseModal,
          titleClass,
          onInputChange,
          onDateChange,
          onSubmit } = useModalCalendar();

  return (
    <>
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={oncloseModal} //* func que se dispara cuando se va llamar la forma de cerrar el modal
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
      >
     <h1> Nuevo evento </h1>
     <hr />
      <form className="container" onSubmit={ onSubmit }>

          <div className="form-group mb-2">
              <label className='d-block'>Fecha y hora inicio</label>
              <DatePicker 
                selected={ start }
                onChange={ (event) => onDateChange(event, 'start') }
                className="form-control"
                dateFormat='Pp'
                showTimeSelect
                locale='es'
                timeCaption='Hora'
              />
          </div>

          <div className="form-group mb-2">
              <label className='d-block'>Fecha y hora fin</label>
              <DatePicker 
              minDate={ start }
                selected={ end }
                onChange={ (event) => onDateChange(event, 'end') }
                className="form-control"
                dateFormat='Pp'
                showTimeSelect
                locale='es'
                timeCaption='Hora'
              />
          </div>

          <hr />
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${ titleClass }`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={ title }
                  onChange={ onInputChange } 
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group mb-2">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={ notes }
                  onChange={ onInputChange } 
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>

      </form>
    </Modal>
    </>
  );
};


//* Probable useEffect

// useEffect(() => {
//   setFormValue({
//     ...formValues,
//     end: addHours( formValues.start, 2)
//   });
// }, [formValues.start]);
// console.log(formValues);