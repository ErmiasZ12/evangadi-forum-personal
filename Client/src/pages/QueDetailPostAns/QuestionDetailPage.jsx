import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosBase from "../../axiosConfig";
import styles from "./QueDetailPostAns.module.css";

import EditDelete from "./EditDelete";
import AnswerList from "./AnswerList";
import PostAnswerForm from "./PostAnswerForm";

const QuestionDetailPage = () => {
  const { question_id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Auth
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  // Fetch single question
  useEffect(() => {
    axiosBase.get(`/questions/${question_id}`).then((res) => {
      setQuestion(res.data.question);
    });
  }, [question_id]);

  // Fetch all answers for that question.
  const fetchAnswers = async () => {
    const res = await axiosBase.get(`/answer/all_answer/${question_id}`);
    setAnswers(res.data.answers || []);
  };

  useEffect(() => {
    fetchAnswers();
  }, [question_id]);

  if (!question) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <EditDelete question={question} setQuestion={setQuestion} />

      <hr />
      <h2 className={styles.sectionTitle}>Answer From The Community</h2>
      <hr />

      <AnswerList answers={answers} />

      <PostAnswerForm question_id={question_id} refreshAnswers={fetchAnswers} />
    </div>
  );
};

export default QuestionDetailPage;
