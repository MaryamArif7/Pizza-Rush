import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Username from "./components/Username";
import Password from "./components/Password";
import Register from "./components/Register";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Username />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },

  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
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
