import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { appRouter } from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
