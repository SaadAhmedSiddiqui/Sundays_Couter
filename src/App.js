import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import SundayPicker from "./SundayPicker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pages/Sundays" element={<SundayPicker />} />
        <Route path="*" element={<Navigate to="/pages/Sundays" />} />
      </Routes>
    </Router>
  );
}

export default App;
