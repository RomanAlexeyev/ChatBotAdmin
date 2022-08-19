import React from "react";
import { Route, Routes } from 'react-router-dom';
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import { AppTopbar } from "./AppTopbar";
import Statistics from "./components/pages/Statistics";
import Moderation from "./components/pages/Moderation";
import QuizTasks from "./components/pages/QuizTasks";
import Mailing from "./components/pages/Mailing";

function App() {
  return (
    <div className="layout-wrapper layout-overlay layout-theme-light">
      <AppTopbar />
      <div className="layout-main-container">
        <div className="layout-main">
          <Routes>
            <Route path="/" exact element={<Statistics />} />
            <Route path="/moderation"  element={<Moderation />} />
            <Route path="/quiz"  element={<QuizTasks />} />
            <Route path="/mailing"  element={<Mailing />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
