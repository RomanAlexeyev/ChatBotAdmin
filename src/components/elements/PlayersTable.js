import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { PlayersService } from "../../service/PlayersService";

const levels = {
  trainee: "Стажер",
  junior: "Джуниор",
  middle: "Миддл",
  senior: "Сеньор",
  teamlead: "Тимлид",
};

const tableNames = {
  statistics: "Список участников",
  moderation: "Проверка данных участников",
  mailing: "Выбор участников",
};

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function PlayersTable({ type, selectedPlayers, setSelectedPlayers }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(null);

  const [currentResume, setCurrentResume] = useState(null);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [currentGroups, setCurrentGroups] = useState(null);
  const [resumeModal, setResumeModal] = useState(false);
  const [postsModal, setPostsModal] = useState(false);
  const [groupsModal, setGroupsModal] = useState(false);

  const playersService = new PlayersService();

  useEffect(() => {
    setLoading(true);
    if (type === "moderation") {
      playersService.getPlayersForModeration().then((data) => {
        setPlayers(data);
        setLoading(false);
      });
    } else {
      playersService.getPlayers().then((data) => {
        setPlayers(data);
        setLoading(false);
      });
    }

    initFilters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initFilters = () => {
    return;
    // setFilters({
    //     'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    //     'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    //     'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    //     'representative': { value: null, matchMode: FilterMatchMode.IN },
    //     'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    //     'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    //     'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    //     'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
    //     'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
    // });
  };

  const photoBodyTemplate = (rowData) => {
    return (
      <div
        style={{
          display: "inline-block",
          width: 40,
          height: 40,
          background: `url(${rowData.photo})`,
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
          borderRadius: "50%",
        }}
      ></div>
    );
  };

  const pointsBodyTemplate = (rowData) => {
    return (
      <span className={`points-badge level-${rowData.level}`}>
        {formatNumber(rowData.points)}
      </span>
    );
  };

  const levelBodyTemplate = (rowData) => {
    return (
      <span className={`player-badge level-${rowData.level}`}>
        {levels[rowData.level]}
      </span>
    );
  };

  const resumeBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "text-green-500 pi-check-circle": rowData.resume,
          "text-pink-500 pi-times-circle": !rowData.resume,
        })}
      ></i>
    );
  };
  const renderResumeFooter = () => {
    return (
      <div className="dialog-footer-button">
        <Button
          label="Подтвердить и начислить 150 баллов"
          onClick={() => setResumeModal(false)}
          className="p-button-text"
        />
      </div>
    );
  };

  const renderPostsFooter = () => {
    return <div></div>;
  };

  const resumeVerifyBodyTemplate = (rowData) => {
    if (!rowData.for_moderation.resume) return null;
    return (
      <>
        <Button
          label="Проверить"
          aria-label="Проверить"
          onClick={() => {
            setCurrentResume(rowData.for_moderation.resume);
            setResumeModal(!resumeModal);
          }}
        />
      </>
    );
  };

  const postsVerifyBodyTemplate = (rowData) => {
    if (!rowData.for_moderation.posts) return null;
    return (
      <>
        <Button
          label={`Проверить${
            rowData.for_moderation.posts.length > 1
              ? " (" + rowData.for_moderation.posts.length + ")"
              : ""
          }`}
          aria-label="Проверить"
          onClick={() => {
            setCurrentPosts(rowData.for_moderation.posts);
            setPostsModal(!postsModal);
          }}
        />
      </>
    );
  };

  const groupsVerifyBodyTemplate = (rowData) => {
    if (!rowData.for_moderation.groups) return null;
    return (
      <>
        <Button
          label={`Проверить${
            rowData.for_moderation.groups.length > 1
              ? " (" + rowData.for_moderation.groups.length + ")"
              : ""
          }`}
          aria-label="Проверить"
          onClick={() => {
            setCurrentGroups(rowData.for_moderation.groups);
            setGroupsModal(!groupsModal);
          }}
        />
      </>
    );
  };

  return (
    <div className="col-12">
      <div className="card">
        <h5>{tableNames[type]}</h5>
        <DataTable
          value={players}
          paginator
          rows={type === "mailing" ? 5 : 10}
          dataKey="id"
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="scroll"
          selection={selectedPlayers}
          onSelectionChange={(e) => setSelectedPlayers(e.value)}
        >
          {type === "mailing" && (
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3em" }}
            ></Column>
          )}
          <Column field="photo" header=" " body={photoBodyTemplate} />
          <Column field="name" header="Имя" style={{ minWidth: "12rem" }} />
          <Column
            field="telegram"
            header="Телеграм"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="points"
            header="Баллы"
            style={{ minWidth: "12rem" }}
            body={pointsBodyTemplate}
          />
          <Column
            field="level"
            header="Уровень"
            style={{ minWidth: "12rem" }}
            body={levelBodyTemplate}
          />
          <Column field="email" header="Email" style={{ minWidth: "12rem" }} />
          <Column
            field="occupation"
            header="Должность"
            style={{ minWidth: "12rem" }}
          />
          {type === "statistics" && (
            <Column
              field="expectations"
              header="Ожидания"
              style={{ minWidth: "12rem" }}
            />
          )}
          {type === "statistics" && (
            <Column
              field="resume"
              header="Резюме"
              dataType="boolean"
              bodyClassName="text-center"
              body={resumeBodyTemplate}
            />
          )}
          {type === "statistics" && <Column field="friends" header="Друзья" />}
          {type === "statistics" && <Column field="groups" header="Группы" />}
          {type === "statistics" && <Column field="posts" header="Посты" />}
          {type === "statistics" && (
            <Column field="right_answers" header="Правильные ответы" />
          )}

          {type === "moderation" && (
            <Column header="Резюме" body={resumeVerifyBodyTemplate} />
          )}
          {type === "moderation" && (
            <Column header="Посты" body={postsVerifyBodyTemplate} />
          )}
          {type === "moderation" && (
            <Column header="Группы" body={groupsVerifyBodyTemplate} />
          )}
        </DataTable>
        <Dialog
          header="Проверка резюме"
          visible={resumeModal}
          style={{ width: "50vw" }}
          footer={renderResumeFooter}
          onHide={() => setResumeModal(false)}
        >
          {currentResume?.link}
        </Dialog>
        <Dialog
          header="Проверка постов"
          visible={postsModal}
          style={{ width: "50vw" }}
          footer={renderPostsFooter}
          onHide={() => setPostsModal(false)}
        >
          {currentPosts && currentPosts.map((post) => post?.link)}
        </Dialog>
        <Dialog
          header="Проверка групп"
          visible={groupsModal}
          style={{ width: "50vw" }}
          footer={renderPostsFooter}
          onHide={() => setGroupsModal(false)}
        >
          {currentGroups && currentGroups.map((group) => group?.link)}
        </Dialog>
      </div>
    </div>
  );
}

export default React.memo(PlayersTable);
