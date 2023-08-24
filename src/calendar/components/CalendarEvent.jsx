import { PropTypes } from 'prop-types';

export const CalendarEvent = ({event}) => {

    // console.log(event);
    const { title, user } = event;
    
  return (
    <div className='p-1 z-index:1000'>
        <strong className=' d-block text-center '>{ title }</strong>
        <span className='d-block mt-3'> - { user.name }</span>
    </div>
  );
};

CalendarEvent.propTypes = {
    event : PropTypes.object
};
