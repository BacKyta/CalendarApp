import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';


const routerNotAuthenticated = createBrowserRouter([
    {
        path: '/auth/*',
        element: <LoginPage />,
        children: [{}]
    },
    {
        path: '/*',
        element: <Navigate to='/auth/login' />,
    }
]);

const routerAuthenticated = createBrowserRouter([
    {
        path: '/',
        element: <CalendarPage/>,
        children: [{}]
    },
    {
        path: '/*',
        element: <Navigate to='/'/>
    }

]);

// const routerDefault = createBrowserRouter([
//     {
//         path: '/*',
//         element: <Navigate to='/auth/login'/>,
//         children: [{}]
// }
// ]);

// const router = createBrowserRouter([
//     {
//         path: '/auth/*',
//         element: <LoginPage />,
//         children: [{}]
//     },
//     {
//         path: '/*',
//         element: <CalendarPage/>,
//         children: [{}]
//     },
//     {
//         path: '/*',
//         element: <CalendarPage/>,
//         children: [{}]
//     }

// ]);

export const AppRouter = () => {

  const authStatus = 'authenticated';
  return (
    <>
    {
        (authStatus === 'authenticated')
        ? <RouterProvider router={routerAuthenticated} />
        : <RouterProvider router={routerNotAuthenticated} />
    }

        {/* <RouterProvider router={routerDefault }/> */}
    </>
    
  );
};
