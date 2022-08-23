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
import { playersAPI } from "./service/PlayersService";
import { quizAPI } from "./service/QuizService";

function App() {

  const {data: players, error, isLoading} = playersAPI.useGetAllPlayersQuery('');
  const {data: playersForM, errorForM, isLoadingForM} = playersAPI.useGetForModerationQuery('');
  const {data: quizTasks, quizError, quizIsLoading} = quizAPI.useGetAllTasksQuery('');

  return (
    <div className="layout-wrapper layout-overlay layout-theme-light">
      <AppTopbar unresolvedModeration={!!playersForM?.data.length}/>
      <div className="layout-main-container">
        <div className="layout-main">
          <Routes>
            <Route path="/" exact element={<Statistics data={players?.data} loading={isLoading} />} />
            <Route path="/moderation"  element={<Moderation data={playersForM?.data} loading={isLoadingForM} />} />
            <Route path="/quiz"  element={<QuizTasks data={quizTasks?.data} loading={quizIsLoading}/>} />
            <Route path="/mailing"  element={<Mailing data={players?.data} loading={isLoading} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
