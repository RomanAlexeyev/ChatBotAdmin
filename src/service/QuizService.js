import axios from "axios";

export class QuizService {
  getTasks() {
    return axios
      .get("assets/demo/data/quiz_tasks.json")
      .then((res) => res.data.data);
  }
}
