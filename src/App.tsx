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

function App() {
  const [token, setToken] = useState<string>("");

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage token={token} setToken={setToken} />}
        />
        <Route
          path="/table"
          element={token ? <TablePage /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/table" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
