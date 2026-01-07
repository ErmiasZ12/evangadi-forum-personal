import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./askQuestion.module.css";
import { AppState } from "../../App";
import axiosBase from "../../axiosConfig";

const AskQuestion = () => {
  const { user } = useContext(AppState);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  // 🔒 Route protection
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    try {
      await axiosBase.post(
        "/questions/questions",
        {
          title: title.trim(),
          description: description.trim(),
          tags: tags.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to post question");
    }
  };

  return (
    <div className={styles.askContainer}>
      <main className={styles.main}>
        {/* Instructions */}
        <section className={styles.instructions}>
          <h2>Steps to write a good question</h2>
          <ul>
            <li>Write a clear and specific title</li>
            <li>Explain the problem in detail</li>
            <li>Describe what you already tried</li>
            <li>Add relevant tags</li>
          </ul>
        </section>

        {/* Form */}
        <section className={styles.formSection}>
          <h2>Ask a public question</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />

            <textarea
              placeholder="Question description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={styles.input}
            />

            <button type="submit" className={styles.submitBtn}>
              Post Question
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AskQuestion;
