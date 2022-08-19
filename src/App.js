import React, { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="layout-wrapper layout-overlay layout-theme-light">
      <AppTopbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className="layout-main-container">
        <div className="layout-main">
          {activeIndex === 0 && <Statistics />}
          {activeIndex === 1 && <Moderation />}
          {activeIndex === 2 && <QuizTasks />}
          {activeIndex === 3 && <Mailing />}
        </div>
      </div>
    </div>
  );
}

export default App;
