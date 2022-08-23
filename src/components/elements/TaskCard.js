import React from "react";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";

function TaskCard({ data, setModal, setTaskForEdit, confirmDelete }) {
  const getAnswers = () => {
    return data.answers.map((answer, i) => {
      return (
        <Chip
          key={i}
          label={answer.body}
          className={`mr-2 mb-2 ${answer.isRight ? "right-answer-chip" : ""}`}
        />
      );
    });
  };

  const editQuestion = () => {
    setTaskForEdit(data);
    setModal("edit");
  };
  return (
    <div className="col-12 lg:col-6 xl:col-3">
      <div className="card mb-0 task-card">
        <div className="flex justify-content-between mb-3">
          <div className="text-900 font-medium text-xl task-question">
            {data.text}
          </div>
          <div>
            <Button
              icon="pi pi-cog"
              className="p-button-rounded p-button-secondary p-button-text"
              aria-label="Редактировать"
              onClick={editQuestion}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger p-button-text"
              aria-label="Удалить"
              onClick={() => confirmDelete(data.id)}
            />
          </div>
        </div>
        <div className="flex align-items-center flex-wrap"> {getAnswers()}</div>
      </div>
    </div>
  );
}

export default TaskCard;
