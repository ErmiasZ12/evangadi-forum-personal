import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SingleQuestionCard.module.css";

const SingleQuestionCard = ({ question }) => {
  const navigate = useNavigate();

  const handleViewAnswer = () => {
    navigate(`/question/${question.question_id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{question.title}</h3>
      </div>

      <p className={styles.description}>
        {question.description.length > 150
          ? question.description.slice(0, 150) + "..."
          : question.description}
      </p>

      <div className={styles.footer}>
        <span className={styles.author}>
          Asked by <strong>{question.username}</strong>
        </span>

        <button
          className={styles.answerBtn}
          onClick={handleViewAnswer}
        >
          View Answers →
        </button>
      </div>
    </div>
  );
};

export default SingleQuestionCard;
