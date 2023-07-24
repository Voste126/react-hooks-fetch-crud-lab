import React from "react";

function QuestionItem({ question,  onDeleteQuestion, onUpdateQuestion}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
//function to render for the delete of an deletebutton
function handleDeleteClick(){
 // Delete request
 fetch(`http://localhost:4000/questions/${question.id}`, {
  method: "DELETE",
})
  .then((r) => r.json())
  .then(() => onDeleteQuestion(question));
}



// Function to handle the correct answer change
function handleCorrectAnswerChange(event) {
  const updatedQuestion = {
    ...question,
    correctIndex: parseInt(event.target.value), // Convert to an integer
  };

  // Send a PATCH request to update the question on the server
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correctIndex: updatedQuestion.correctIndex,
    }),
  })
    .then((response) => response.json())
    .then(() => onUpdateQuestion(updatedQuestion));

}
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
