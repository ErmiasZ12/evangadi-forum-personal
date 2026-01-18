import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./askQuestion.module.css";
import { AppState } from "../../App";
import instance from "../../axiosConfig";

const AskQuestion = () => {
  const { user, fetchQuestions } = useContext(AppState);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(""); // ADDED: tags state

  // Route protection
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Checking if all fields are filled
    if (!title.trim() || !description.trim() || !tags.trim()) {
      alert("All fields (Title, Description, and Tags) are required");
      return;
    }

    try {
      await instance.post(
        "/questions/post",
        {
          title: title.trim(),
          description: description.trim(),
          tags: tags.trim(), // ADDED: sending tags as a string
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Refresh questions list on the home page after successful post
      if (fetchQuestions) {
        await fetchQuestions();
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Failed to post question");
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
            <li>Add tags (e.g., javascript, react, node)</li>
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

            {/* ADDED: Tags Input Field */}
            <input
              type="text"
              placeholder="Tags (comma separated: react, node, sql)"
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