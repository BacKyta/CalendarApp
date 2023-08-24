import { useCalendarStore, useUiStore } from '../../hooks';
import 'sweetalert2/dist/sweetalert2.min.css';

export const FabDelete = () => {


  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const{ isDateModalOpen } = useUiStore();
 
  const handleDelete = () =>{
    startDeletingEvent();
  };


  return (
    <>
    { isDateModalOpen === false && (
          <button
          data-testid='btn-delete'
          className="btn btn-danger fab-danger"
          onClick={ handleDelete }
          style={{display: hasEventSelected ? '' : 'none' }}
          >
          <i className="fas fa-trash"></i>
      </button>
     )} 
    </>
  );
};
