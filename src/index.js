import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <BrowserRouter>
      <Provider store={store}>
      <App />
      </Provider>
      </BrowserRouter>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
