import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";
import { Badge } from "primereact/badge";

const indices = {
  "/": 0,
  "/moderation": 1,
  "/quiz": 2,
  "/mailing": 3,
};

export const AppTopbar = ({ unresolvedModeration }) => {
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(indices[location.pathname]);
  }, [location]);

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
      template: (item, options) => {
        return (
          <a
            className={options.className}
            target={item.target}
            onClick={options.onClick}
          >
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
            {unresolvedModeration && (
              <Badge
                value="!"
                className="moderation-badge"
                severity="danger"
              ></Badge>
            )}
          </a>
        );
      },
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
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />
    </div>
  );
};
