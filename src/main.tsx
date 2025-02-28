import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./styles/index.css";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import ErrorPage from "./Error/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Leads from "./pages/Leads";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leads" element={<Leads />} />
              
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
