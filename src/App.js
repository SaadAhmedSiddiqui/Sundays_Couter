import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Page from "./component/Sundays";

function App() {
  const basePrefix = process.env.REACT_APP_BASE_PREFIX || "/";

  return (
    <Router>
      <Routes>
        <Route path={`${basePrefix}pages/sundays`} element={<Page />} />
        <Route
          path="*"
          element={<Navigate to={`${basePrefix}pages/sundays`} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
