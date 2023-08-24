import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';
import { store } from './store';
import { MemoryRouter } from 'react-router-dom';


export const CalendarApp = () => {
  return (
    <>
        <Provider store={ store }>
         
            <AppRouter/>
            <MemoryRouter/>
        </Provider>
    </>
  );

 
};
