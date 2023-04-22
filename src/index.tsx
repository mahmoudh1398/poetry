import App from "./App";
import React from "react";
import "./assets/index.scss";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { persistedStore, store } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
