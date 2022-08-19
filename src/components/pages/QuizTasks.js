import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { QuizService } from "../../service/QuizService";
import TaskCard from "../elements/TaskCard";
import QuestionDialogBody from "../elements/QuestionDialogBody";

function QuizTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [taskForEdit, setTaskForEdit] = useState(null);
  const quizService = new QuizService();

  useEffect(() => {
    setLoading(true);
    quizService.getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const renderEditFooter = () => {
    return (
      <Button
        label="Сохранить"
        aria-label="Submit"
        onClick={() => {setModal(null); setTaskForEdit(null)}}
      />
    );
  };

  return (
    <>
      <div className="mb-6">
        <Button
          label="Создать"
          aria-label="Submit"
          onClick={() => setModal("create")}
        />
      </div>
      <h5 className="mb-5">Разыгранные вопросы:</h5>
      <div className="grid">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            data={task}
            setModal={setModal}
            setTaskForEdit={setTaskForEdit}
          />
        ))}
      </div>
      <Dialog
        header={modal === "edit" ? "Редактировать" : "Создать"}
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