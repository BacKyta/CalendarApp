import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, calendarSlice, authSlice } from './';


export const store = configureStore ({
    
    reducer:{
        auth    : authSlice.reducer,
        ui      : uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    middleware: ( getDefaultMiddleware )=> getDefaultMiddleware({
        serializableCheck: false
    })
    //* para que las fechas con Date(), no revise si las puede serializar.
});






//* mandamos el .reducer osea el estado y de aqui se sacaran la infomacion, as demas son las acciones
//* que actualizaran el estado y se actualizara