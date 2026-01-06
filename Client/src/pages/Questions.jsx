import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./question.module.css";
import axiosBase from "../axiosConfig";
import { AppState } from "../App";
import { FaArrowCircleRight, FaUserCircle } from "react-icons/fa"; // Install react-icons if you haven't

const Question = () => {
  const { question_id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppState);

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  // Route protection
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch Question and Answers
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const questionRes = await axiosBase.get(`/questions/${question_id}`, { headers });
        const answersRes = await axiosBase.get(`/answers/${question_id}`, { headers });

        setQuestion(questionRes.data.question);
        setAnswers(answersRes.data.answers || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [question_id]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer) return alert("Please type an answer");

    try {
      await axiosBase.post(
        "/answers",
        { question_id, answer: newAnswer },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setNewAnswer("");
      window.location.reload(); // Refresh to show new answer
    } catch (err) {
      alert("Something went wrong");
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Question Section */}
        <section className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>QUESTION</h2>
          <div className={styles.questionTitleRow}>
            <FaArrowCircleRight className={styles.arrowIcon} />
            <h3 className={styles.questionTitle}>{question?.title}</h3>
          </div>
          <p className={styles.questionDesc}>{question?.description}</p>
        </section>

        <hr className={styles.divider} />

        {/* Answers List */}
        <section className={styles.answersSection}>
          <h2 className={styles.communityTitle}>Answer From The Community</h2>
          <div className={styles.answersList}>
            {answers.map((ans, index) => (
              <div key={index} className={styles.answerRow}>
                <div className={styles.userInfo}>
                  <FaUserCircle className={styles.avatar} />
                  <span className={styles.username}>{ans.username}</span>
                </div>
                <div className={styles.answerText}>{ans.answer}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Post Answer Section */}
        <section className={styles.postAnswerBox}>
          <form onSubmit={handlePostAnswer}>
            <textarea
              className={styles.textarea}
              placeholder="Your answer ..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <button type="submit" className={styles.postBtn}>
              Post Answer
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Question;