import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { AppState } from "../../App";
import instance from "../../axiosConfig";
import avatar from "../../assets/avatar.png";

const Home = () => {
  const { user, questions, setQuestions } = useContext(AppState);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  async function fetchQuestions(searchTerm = "") {
    try {
      const { data } = await instance.get(`/questions?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    fetchQuestions(value);
  }

  return (
    <div className={styles["home-container"]}>
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

        {/* 🔍 SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={handleSearch}
          className={styles.search}
        />

        <h2 className={styles["questions-title"]}>Questions</h2>

        <div className={styles["question-list"]}>
          {questions.map((q) => (
            <div
              key={q.question_id}
              className={styles["question-item"]}
              onClick={() => navigate(`/questions/${q.question_id}`)}
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
