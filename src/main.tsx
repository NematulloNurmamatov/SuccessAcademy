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
import Clients from "./pages/Clients";
import ClientsDetails from "./pages/ClientsDetails";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="leads" element={<Leads />} />
              <Route path="clients" element={<Clients />} />
              <Route path="clients-deteils/:id" element={<ClientsDetails />} />

              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
