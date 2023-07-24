import React  from "react";
import { useState } from "react";
import { useEffect } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";


function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);


  //Add a useffect to prompt aa hook
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => setQuestions(questions));
  }, [])


  //Function for the new question added
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions,newQuestion])
  }

  //function to handle delete
  function handleDelete(deletedQuestion) {
    const newUpdatedQuestions = questions.filter(
      (question) => question.id !== deletedQuestion.id
    );
    setQuestions(newUpdatedQuestions);
  }
  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    setQuestions(updatedQuestions);
  }

  function handleViewQuestions() {
    setShowQuestions(true);
  }



  return (
    <section>
      <h1>Quiz Questions</h1>
      {showQuestions && (
        <ul>
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onDeleteQuestion={handleDelete}
              onUpdateQuestion={handleUpdateQuestion}
            />
          ))}
        </ul>
      )}
      <QuestionForm
        onAddQuestion={handleAddQuestion}
        onViewQuestions={handleViewQuestions}
      />
    </section>
  );
}

export default QuestionList;
