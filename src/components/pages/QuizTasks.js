import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import TaskCard from "../elements/TaskCard";
import QuestionDialogBody from "../elements/QuestionDialogBody";

function QuizTasks({data, loading}) {

  const [modal, setModal] = useState(null);
  const [taskForEdit, setTaskForEdit] = useState(null);

  const renderEditFooter = () => {
    return (
      <Button
        label="Сохранить"
        aria-label="Submit"
        onClick={() => {
          setModal(null);
          setTaskForEdit(null);
        }}
      />
    );
  };

  const acceptFunc = (id) => {
    console.log(id);
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: "Вы действительно хотите удалить этот вопрос?",
      header: "Подтвердите удаление",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Да",
      rejectLabel: "Нет",
      accept: () => acceptFunc(id),
      // reject: () => rejectFunc()
    });
  };

  return (
    <>
      <ConfirmDialog />
      <div className="mb-6">
        <Button
          label="Создать"
          aria-label="Submit"
          onClick={() => setModal("create")}
        />
      </div>
      <h5 className="mb-5">Разыгранные вопросы:</h5>
      <div className="grid">
        {data && data.map((task) => (
          <TaskCard
            key={task.id}
            data={task}
            setModal={setModal}
            setTaskForEdit={setTaskForEdit}
            confirmDelete={confirmDelete}
          />
        ))}
      </div>
      <Dialog
        header={modal === "edit" ? "Редактировать вопрос" : "Создать вопрос"}
        visible={modal !== null}
        style={{ width: "33vw" }}
        footer={renderEditFooter}
        onHide={() => setModal(null)}
      >
        <QuestionDialogBody task={taskForEdit} />
      </Dialog>
    </>
  );
}

export default QuizTasks;
