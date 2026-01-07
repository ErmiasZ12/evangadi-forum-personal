import { useState } from "react";
import instance from "../../axiosConfig";
import styles from "./QueDetailPostAns.module.css";

const PostAnswerForm = ({ question_id, refreshAnswers }) => {
  const [postAnswer, setPostAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postAnswer.trim()) return;

    try {
      const res = await instance.post("/answers/postAnswers", {
        question_id,
        answer: postAnswer,
      });
       console.log("question_id =", question_id);

      alert(res.data.msg); // show success message
      setPostAnswer("");
      refreshAnswers();
    } catch (error) {
      console.error(error.response);
      alert(error.response?.data?.msg || "Failed to post answer");
    }
  };

  return (
    <div className={styles.postBox}>
      <div className={styles.center}>
        <h2>Answer The Top Question</h2>
        <p className={styles.goto}>Go to Question page</p>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={postAnswer}
          onChange={(e) => setPostAnswer(e.target.value)}
          placeholder="Your Answer..."
        />
        <button type="submit">Post Your Answer</button>
      </form>
    </div>
  );
};

export default PostAnswerForm;
