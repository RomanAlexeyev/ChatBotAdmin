import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";

const indices = {
  "/": 0,
  "/moderation": 1,
  "/quiz": 2,
  "/mailing": 3,
}

export const AppTopbar = () => {

  const location = useLocation();

  const items = [
    {
      label: "Статистика",
      icon: "pi pi-fw pi-chart-bar",
      command: (event) => {
        window.location.hash = "/";
      },
    },
    {
      label: "Модерация",
      icon: "pi pi-fw pi-cog",
      command: (event) => {
        window.location.hash = "/moderation";
      },
    },
    {
      label: "Задания",
      icon: "pi pi-fw pi-book",
      command: (event) => {
        window.location.hash = "/quiz";
      },
    },
    {
      label: "Рассылка",
      icon: "pi pi-fw pi-send",
      command: (event) => {
        window.location.hash = "/mailing";
      },
    },
  ];

  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <span>ChatBotAdmin</span>
      </Link>
      <TabMenu model={items} activeIndex={indices[location.pathname]} />
    </div>
  );
};
