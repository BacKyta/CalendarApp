import { useCalendarStore, useUiStore } from '../../hooks';

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
