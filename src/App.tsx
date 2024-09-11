import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginPage from "./routes/LoginPage";
import TablePage from "./routes/TablePage";
import { Toaster } from "sonner";

function App() {
  const [token, setToken] = useState<string>("");

  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        <Route
          path="/login"
          element={<LoginPage token={token} setToken={setToken} />}
        />
        <Route
          path="/table"
          element={
            token ? <TablePage token={token} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/table" : "/login"} />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
