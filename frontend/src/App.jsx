import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import Login from "./components/Login"
//import Menu from "./components/Menu";
const router = createBrowserRouter([
 

  {
    path: "/",
    element: <Home />,
  }, 
  {
    path: "/register",
    element: <Register />,
  },
  
  {
    path: "/login",
    element: (
      <Login />
    ),
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
   
      <main>
    
        <RouterProvider router={router}></RouterProvider>
      </main>
    </div>
  );
}

export default App;
