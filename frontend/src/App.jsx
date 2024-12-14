import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import Login from "./components/Login"
import Contact from "./pages/Conatact";
import AboutUs from "./pages/AboutUs"
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
  {
    path:"/Contact",
    element:<Contact />
  },
  {
    path:"/AboutUs",
    element:<AboutUs />
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
