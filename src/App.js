import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Page from "./component/Page";

function App() {
  let baseUrl = "";
  if (window.location.href.includes("saadahmedsiddiqui.github.io")) {
    baseUrl += "date-picker-assignment/";
  }
  return (
    <Router>
      <Routes>
        <Route path={`/${baseUrl}pages/Sundays`} element={<Page />} />
        <Route
          path="*"
          element={<Navigate to={`/${baseUrl}pages/Sundays`} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
