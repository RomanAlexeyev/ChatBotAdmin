import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";

const initAnswers = [
    {
        body: "",
        isRight: true
    },
    {
        body: "",
        isRight: false
    },
    {
        body: "",
        isRight: false
    },
]

function QuestionDialogBody({ task }) {
  const [questionText, setQuestionText] = useState(task?.text || "");
  const [questionAnswers, setQuestionAnswers] = useState(task?.answers ? task.answers.map(ans => ({...ans})) : initAnswers);

  const editAnswer = (val, i, type) => {
    if (type === "isRight" && val === false) return;

    let answers = [...questionAnswers];
    answers[i][type] = val;
    if (type === "isRight") {
      answers.map((item, idx) => {
        if (idx !== i) {
          item.isRight = false;
        }
      });
    }
    setQuestionAnswers(answers);
  };

  console.log(questionAnswers)

  const renderAnswer = (ans, i) => {
    return (
      <div className="flex justify-content-between mb-4 question-answer" key={i}>
        <InputText
          value={ans.body}
          onChange={(e) => editAnswer(e.target.value, i, "body")}
          type="text"
          className="block"
        />
        <div className="flex align-items-center">
          <span style={{marginRight: "1rem", opacity: ans.isRight ? 1 : 0.5}}>Правильный ответ</span>
          <InputSwitch
            checked={ans.isRight}
            onChange={(e) => editAnswer(e.value, i, "isRight")}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <h6>Вопрос:</h6>
      <InputText
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        type="text"
        className="p-inputtext-lg block question-input mb-6"
      />
      <div className="flex justify-content-between">
        <h6>Варианты ответов:</h6>
      </div>

      <div>{questionAnswers.map((ans, i) => renderAnswer(ans, i))}</div>
    </div>
  );
}

export default QuestionDialogBody;
