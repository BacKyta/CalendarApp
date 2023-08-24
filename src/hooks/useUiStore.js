import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal, onSetActiveEvent, onToggleDateModal } from '../store';

export const useUiStore = () =>{

    const dispatch = useDispatch();

    const{ isDateModalOpen } = useSelector( state => state.ui );

    const openDateModal = () =>{
        dispatch( onOpenDateModal() );
    };

    const closeDateModal = () =>{
        dispatch( onCloseDateModal() );
        dispatch( onSetActiveEvent( null ) );
    };

    const toggleDateModal = () =>{
        dispatch(onToggleDateModal() );
    
    };

    return{
        //*Properties
        isDateModalOpen,

        //* Methods
        openDateModal,
        closeDateModal,
        toggleDateModal
    };

};
