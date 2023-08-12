import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarAPi';
import { clearErrorMessage, onChecking, onLogin, onLogout, onRegister } from '../store';
import Swal from 'sweetalert2';

export const useAuthStore = () => {
    
    const {status, user, errorMessage} = useSelector( state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) =>{
        
        // console.log({ email, password });
        dispatch( onChecking() );

        try {
           
            const { data } = await calendarApi.post('/auth',{ email, password });
            console.log({ data });
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            localStorage.setItem('uid', data.uid);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            // console.log({ error });

            dispatch( onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch( clearErrorMessage());
            }, 10);
        }
    };

    const startRegister = async ({ name, email, password}) =>{
        
        dispatch( onChecking() );

        try {
            const { data } = await calendarApi.post('/auth/new',{ name, email, password });
            console.log(data); // no existe la data porque retina error , manda al catch
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onRegister({ name: data.name, uid: data.uid}) );
            if(data){
                Swal.fire('Registro exitoso','Gracias por registrate', 'success');
            }

        } catch (error) {
            console.log(error);
          
            dispatch( onLogout( error.response.data?.msg || Object.values(error.response.data.errors)[0].msg));
            setTimeout(() => {
                dispatch( clearErrorMessage());
            }, 10);
            console.log(error);
          }
      
        };
        
        //* Se llama en un lugar especifico, no se puede llamar en un useEffect porque va hacer que 
        //* se dispare muchas veces en todos los lugares en que se va utilizar este custom hook


    const checkAuthToken = async() =>{

        const token = localStorage.getItem('token');
        // const name = localStorage.getItem('name');
        // const uid = localStorage.getItem('uid');
      

        console.log('me dispare');
        if ( !token ) return dispatch( onLogout() );
        
        try {
            console.log('me dispare');
            // if (token) {

            //     localStorage.setItem('token', token);
            //     localStorage.setItem('token-init-date', new Date().getTime());
            //     dispatch( onLogin({ name: name, uid: uid }) );

            // }else{
                
                const { data } = calendarApi.get('auth/renew');
                console.log({ data });
                localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.name);
                localStorage.setItem('uid', data.uid);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch( onLogin({ name: data.name, uid: data.uid }) );

            // }



        } catch (error) {
            console.log('me dispare');
            console.log(error);
            localStorage.clear();
            dispatch( onLogout() );
        }

    };


    const startLogout = () =>{
        
        localStorage.clear();
        dispatch( onLogout() );

    };


    return{
        //* Properties
        status,
        user, 
        errorMessage,


        //* Methods( acciones que se llaman para iteractuar con el store)
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout

    };
};


//* Tiene como objetivo realizar cualqueir iteraccion con la parte del auth en el store.