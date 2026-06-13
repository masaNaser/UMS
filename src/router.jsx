import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import AddUser from "./pages/AddUser";
import  EditUser from "./pages/EditUser";
import  DetailsUser from "./pages/DetailsUser";


const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout/>,
        children:[
              {
                index:true,
                element:<Home/>
            },
            {
                path: '/add-user',
                element: <AddUser/>
            },
            {
                path: '/edit-user/:id',
                element: <EditUser/>
            },
            {
                path:`details-user/:id`,
                element : <DetailsUser/>
            }
          
        ]
    }
]);
export default router;