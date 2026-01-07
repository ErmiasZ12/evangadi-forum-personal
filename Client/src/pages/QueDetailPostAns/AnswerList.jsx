import avatar from "../../assets/avatar.png";
import styles from "./QueDetailPostAns.module.css";

const AnswerList = ({ answers }) => {
  if (answers.length === 0) {
    return <p className={styles.noAnswer}>No answers yet.</p>;
  }

  return answers.map((ans) => (
    <div className={styles.answerWrapper} key={ans.answerid}>
      <div className={styles.answerLeft}>
        <img src={avatar} className={styles.avatar} alt="avatar" />
        <p className={styles.username}>{ans.username}</p>
      </div>
      <div className={styles.answerRight}>
        <p className={styles.answerText}>{ans.answer}</p>
      </div>
    </div>
  ));
};

export default AnswerList;
