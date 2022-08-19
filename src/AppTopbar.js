import React from "react";
import { TabMenu } from "primereact/tabmenu";

export const AppTopbar = ({ activeIndex, setActiveIndex }) => {
  const items = [
    { label: "Статистика", icon: "pi pi-fw pi-chart-bar",  },
    { label: "Модерация", icon: "pi pi-fw pi-cog" },
    { label: "Задания", icon: "pi pi-fw pi-book" },
    { label: "Рассылка", icon: "pi pi-fw pi-send" },
  ];

  return (
    <div className="layout-topbar">
      <div className="layout-topbar-logo" onClick={() => setActiveIndex(0)}>
        <span>ChatBotAdmin</span>
      </div>
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />
    </div>
  );
};
