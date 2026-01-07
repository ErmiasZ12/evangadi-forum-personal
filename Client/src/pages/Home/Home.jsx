import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { AppState } from "../../App";
import instance from "../../axiosConfig";
import avatar from "../../assets/avatar.png";

const Home = () => {
  const { user, questions, setQuestions } = useContext(AppState);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      const { data } = await instance.get("/questions/allQuestions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestions(data.questions);
    }

    fetchQuestions();
  }, [setQuestions]);

  return (
    <div className={styles["home-container"]}>
      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles["top-bar"]}>
          <button
            className={styles["ask-btn"]}
            onClick={() => navigate("/ask")}
          >
            Ask Question
          </button>

          <h3 className={styles.welcome}>
            Welcome: <span>{user?.username}</span>
          </h3>
        </div>

        <h2 className={styles["questions-title"]}>Questions</h2>

        {/* Questions List */}
        <div className={styles["question-list"]}>
          {questions.map((q) => (
            <div
            
              key={q.question_id}
              className={styles["question-item"]}
              onClick={function () {navigate(`/questions/${q.question_id}`);  console.log(q)}}
            >
             
              <img src={avatar} alt="avatar" className={styles["avatar-img"]} />

              <div className={styles["question-text"]}>
                <p>{q.title}</p>
                <small>{q.username}</small>
              </div>

              <div className={styles.arrow}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
