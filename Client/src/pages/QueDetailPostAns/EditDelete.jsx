import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import styles from "./QueDetailPostAns.module.css";

const EditDelete = ({ question, setQuestion }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(question.title);
  const [editDescription, setEditDescription] = useState(question.description);

  const handleEdit = async () => {
    await axiosBase.put(
      `/questions/${question.question_id}`,
      { title: editTitle, description: editDescription },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    const res = await axiosBase.get(`/questions/${question.question_id}`);
    setQuestion(res.data.question);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this question?")) return;

    await axiosBase.delete(`/questions/${question.question_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    navigate("/");
  };

  return (
    <>
      <h1 className={styles.sectionTitle}>Question</h1>

      {isEditing ? (
        <div className={styles.editBox}>
          <input
            className={styles.editTitle}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className={styles.editTextarea}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <div className={styles.actionRow}>
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3 className={styles.questionTitle}>{question.title}</h3>
          <p className={styles.questionDesc}>{question.description}</p>
          <div className={styles.actionRow}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </>
  );
};

export default EditDelete;
