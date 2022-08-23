import React, { useState } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import ReviewBody from "./ReviewBody";

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

function PlayersTable({ type, selectedPlayers, setSelectedPlayers, data, loading }) {

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    telegram: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    level: { value: null, matchMode: FilterMatchMode.EQUALS },
    resume: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  const [currentForReview, setCurrentForReview] = useState(null);
  const [resumeModal, setResumeModal] = useState(false);
  const [postsModal, setPostsModal] = useState(false);
  const [groupsModal, setGroupsModal] = useState(false);

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

  const telegramBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center telegram">
        <i className="pi pi-telegram mr-2"></i> <span>{rowData.telegram}</span>
      </div>
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
      <div className="dialog-footer-button center">
        <Button
          label="Подтвердить и начислить 150 баллов"
          onClick={() => setResumeModal(false)}
          className="p-button"
        />
      </div>
    );
  };

  const renderEmptyFooter = () => {
    return <div></div>;
  };

  const resumeVerifyBodyTemplate = (rowData) => {
    if (!rowData?.forModeration?.resume) return null;
    return (
      <>
        <Button
          label="Проверить"
          aria-label="Проверить"
          onClick={() => {
            setCurrentForReview(rowData);
            setResumeModal(!resumeModal);
          }}
        />
      </>
    );
  };

  const postsVerifyBodyTemplate = (rowData) => {
    if (!rowData?.forModeration?.posts) return null;
    return (
      <>
        <Button
          label={`Проверить${
            rowData.forModeration.posts.length > 1
              ? " (" + rowData.forModeration.posts.length + ")"
              : ""
          }`}
          aria-label="Проверить"
          onClick={() => {
            setCurrentForReview(rowData);
            setPostsModal(!postsModal);
          }}
        />
      </>
    );
  };

  const groupsVerifyBodyTemplate = (rowData) => {
    if (!rowData?.forModeration?.groups) return null;
    return (
      <>
        <Button
          label={`Проверить${
            rowData.forModeration.groups.length > 1
              ? " (" + rowData.forModeration.groups.length + ")"
              : ""
          }`}
          aria-label="Проверить"
          onClick={() => {
            setCurrentForReview(rowData);
            setGroupsModal(!groupsModal);
          }}
        />
      </>
    );
  };

  const levelItemTemplate = (option) => {
    return (
      <span className={`player-badge level-${option}`}>{levels[option]}</span>
    );
  };

  const selectedLevelItemTemplate = (option, props) => {
    if (option) {
        return (
          <span className={`player-badge level-${option}`}>{levels[option]}</span>
        );
    }

    return (
        <span>
            {props.placeholder}
        </span>
    );
}

  const levelFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={Object.keys(levels)}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={levelItemTemplate}
        valueTemplate={selectedLevelItemTemplate}
        placeholder="Уровень"
        className="p-column-filter level"
      />
    );
  };

  const resumeFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  return (
    <div className="col-12">
      <div className="card">
        <h5>{tableNames[type]}</h5>
        <DataTable
          value={data}
          paginator
          rows={type === "mailing" ? 5 : 10}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          loading={loading}
          responsiveLayout="scroll"
          selection={selectedPlayers}
          onSelectionChange={(e) => setSelectedPlayers(e.value)}
          emptyMessage="Нет данных для отображения"
        >
          {type === "mailing" && (
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3em" }}
            ></Column>
          )}
          <Column
            field="photo"
            header=" "
            body={photoBodyTemplate}
            style={{ width: "2rem" }}
          />
          <Column
            field="name"
            header="Имя"
            style={{ width: "16rem" }}
            filter
            showFilterMenu={false}
          />
          <Column
            field="telegram"
            header="Телеграм"
            body={telegramBodyTemplate}
            style={{ width: "16rem" }}
            filter
            showFilterMenu={false}
          />
          <Column
            field="points"
            header="Баллы"
            style={{ width: "12rem" }}
            body={pointsBodyTemplate}
          />
          <Column
            field="level"
            header="Уровень"
            style={{ width: "12rem" }}
            body={levelBodyTemplate}
            filter
            showFilterMenu={false}
            filterElement={levelFilterTemplate}
          />
          <Column field="email" header="Email" style={{ width: "20rem" }} />
          <Column
            field="occupation"
            header="Должность"
            style={{ width: "16rem" }}
          />
          {type === "statistics" && (
            <Column
              field="expectations"
              header="Ожидания"
              style={{ width: "24rem" }}
            />
          )}
          {type === "statistics" && (
            <Column
              field="resume"
              header="Резюме"
              dataType="boolean"
              body={resumeBodyTemplate}
              filter
              filterElement={resumeFilterTemplate}
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
          style={{ width: "33vw" }}
          footer={renderResumeFooter}
          onHide={() => setResumeModal(false)}
        >
          <ReviewBody data={currentForReview} levels={levels} formatNumber={formatNumber} type="resume"/>
        </Dialog>
        <Dialog
          header="Проверка постов"
          visible={postsModal}
          style={{ width: "33vw" }}
          footer={renderEmptyFooter}
          onHide={() => setPostsModal(false)}
        >
          <ReviewBody data={currentForReview} levels={levels} formatNumber={formatNumber} type="posts"/>
        </Dialog>
        <Dialog
          header="Проверка групп"
          visible={groupsModal}
          style={{ width: "33vw" }}
          footer={renderEmptyFooter}
          onHide={() => setGroupsModal(false)}
        >
          <ReviewBody data={currentForReview} levels={levels} formatNumber={formatNumber} type="groups"/>
        </Dialog>
      </div>
    </div>
  );
}

export default React.memo(PlayersTable);
