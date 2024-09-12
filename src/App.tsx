import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import LoginPage from "./routes/LoginPage";
import TablePage from "./routes/TablePage";
import { RootState } from "./redux/store";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.token);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/table"
          element={token ? <TablePage /> : <Navigate to="/login" />}
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
