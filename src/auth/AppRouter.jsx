import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { CheckingAuth } from "../ui/components/CheckingAuth";

import { useCheckAuth } from "../hooks/useCheckAuth";
import { JournalPage } from "../journal/pages/JournalPage";
import { LoginPage, RegisterPage } from "../auth/pages";



const routerAuthenticated =  createBrowserRouter ([
  
    {
      path:"/" ,
      element: <JournalPage/>,
    },
    {
      path: "/*",
      element: <Navigate to='/' />,
    },
  
  ]);

const routerNotAuthenticated =  createBrowserRouter ([
 
    {
      path: "/auth/login",
      element: <LoginPage /> 
    },
    {
      path: "register",
      element: <RegisterPage/>
    },
    {
      path: "/*",
      element: <Navigate to="/auth/login"/> ,
    }

  ]);

// const routerDefault =  createBrowserRouter ([
//     {
//       path: "/auth/login",
//       element: <Navigate to='/auth/login' /> ,
      
//     }
 
//   ]);


  export const AppRouter = () =>{

    const { status } = useCheckAuth();
    if ( status === 'checking') {
      return <CheckingAuth/>;// se muestra mientras se resuelve el async del useEfect
    }
    
    return (
      <>
      {
        (status === 'authenticated')
        ? <RouterProvider router={ routerAuthenticated }/>
        : <RouterProvider router={ routerNotAuthenticated }/>
        
      }
        {/* <RouterProvider router={ routerDefault }/> */}
      </>
    );
  };