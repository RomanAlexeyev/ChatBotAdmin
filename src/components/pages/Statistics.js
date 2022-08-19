import React, { useState } from "react";

import PlayersTable from "../elements/PlayersTable";

function Statistics() {
  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">Игроков</span>
              <div className="text-900 font-medium text-xl">256</div>
            </div>
          </div>
          <span className="text-green-500 font-medium">43 % </span>
          <span className="text-500">от всех участников</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Получено резюме
              </span>
              <div className="text-900 font-medium text-xl">34</div>
            </div>
          </div>
          <span className="text-green-500 font-medium">13 % </span>
          <span className="text-500">от всех игроков</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Обратная связь от
              </span>
              <div className="text-900 font-medium text-xl">110 человек</div>
            </div>
          </div>
          <span className="text-green-500 font-medium">43 % </span>
          <span className="text-500">от всех игроков</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Средний балл
              </span>
              <div className="text-900 font-medium text-xl">9,27</div>
            </div>
          </div>
          <span className="text-green-500 font-medium">из 10 </span>
        </div>
      </div>

      <PlayersTable type="statistics"/>
    </div>
  );
}

export default Statistics;
