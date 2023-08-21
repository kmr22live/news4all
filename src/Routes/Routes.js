import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../Pages/SignIn/SignIn";
import Main from "../component/Main/Main";
import FavouriteNews from "../component/FavouriteNews";
import FullNews from "../component/FullNews";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/home" replace={true} /> },
      {
        path: "/signin",
        element: <SignIn />,
      },
      ,
      {
        path: "/home",
        element: <Main />,
      },
      {
        path: "/favourite",
        element: <FavouriteNews />,
      },
      {
        path: "/fullnews/:data",
        element: <FullNews />,
      },
    ],
  },
]);
