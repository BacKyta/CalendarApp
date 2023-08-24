import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';


export const AppRouter = () => {
    
    const { status, checkAuthToken } = useAuthStore();
    // const isAuthenticated = useMemo(() => status === 'authenticated', [status]);

    useEffect(() => {
        
        checkAuthToken();    
        
    }, []);


    if (status === 'checking') {
        return(

            <h1> Cargando.... </h1>
        );
    }


    // const { status } = useCheckAuth();
    // if ( status === 'checking') {
    //   return <CheckingAuth/>;
    // }
  
    const router =
    ( status === 'authenticated' )
    
        ? createBrowserRouter([
            {
                path: '/',
                element: <CalendarPage/>,
            },
            {
                path: '/*',
                element: <Navigate to='/'/>
            }
            
        ])
        : createBrowserRouter([
            {
                path:'/auth/*' ,
                element: <LoginPage/>,
            },
            {
                path: '/*',
                element: <Navigate to='/auth/login' />,
            }
        ]);


    return <RouterProvider router={ router } />;

};
