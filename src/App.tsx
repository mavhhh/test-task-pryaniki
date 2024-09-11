import React, { useState } from "react";
import "./App.css";
import LoginPage from "./routes/LoginPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [token, setToken] = useState<string>("");

  return (
    <div className="App">
      <LoginPage token={token} setToken={setToken} />
    </div>
  );
}

export default App;
