import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

import LoginPage from "./routes/LoginPage";
import TablePage from "./routes/TablePage";
import { RootState } from "./redux/store";
import { Header } from "./components/Header";

function App() {
  const { token } = useSelector((state: RootState) => state.token);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <Router>
      <Toaster position="bottom-right" />
      <Header />
      <Routes>
        <Route path="test-task-pryaniki/login" element={<LoginPage />} />
        <Route
          path="test-task-pryaniki/table"
          element={token ? <TablePage /> : <Navigate to="test-task-pryaniki/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "test-task-pryaniki/table" : "test-task-pryaniki/login"} />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
