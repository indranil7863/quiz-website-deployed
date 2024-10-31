import React, { useEffect } from "react";
import data from '../quiz-data/Data1.js'
import { useState } from "react";
import '../style/Questions.css'
import Result from "./Result.jsx";
// import { resultStore } from "../store/resultStore.js";
import { useAuthStore } from "../store/authStore.js";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const Question = () =>{
    const [currqindex, setCurrqIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    // const {saveResult} = resultStore();
    const [score, setScore] = useState(null);
    const [showResults, setshowResults] = useState(false);
     
    const {user} = useAuthStore();
    const handleOptionSelect = (option) => {
        setSelectedAnswers({
          ...selectedAnswers,
          [currqindex]: option,
        });
      };

    const currentQuestion = data[currqindex];
    const isLastQuestion = currqindex === data.length -1;
      const calculateScore = () =>{
        let correctCount = 0;
        data.forEach((question, index) =>{
            if(selectedAnswers[index] === question.correctAnswer){
                correctCount++;
            }
            
        });
        return correctCount;
      }

    const handleNext = () =>{
        setCurrqIndex((prevIndex) => prevIndex+1)
    }
    const handlePrev = () =>{
        setCurrqIndex((prevIndex) => prevIndex -1)
    }
        
    const handleSubmit = async () =>{
     
        // directed to result page
        alert("Quiz submitted")
        // setAttempt(selectedAnswers.length);
        const correctAnswercount = calculateScore();
        setScore(correctAnswercount);
        setshowResults(true);
         const totalQuestion = data.length;
    const totalScore = correctAnswercount * 5;
    const wrongAns = Object.keys(selectedAnswers).length;
    const totalpoints = parseInt(totalQuestion) *5;
    const accuracy = Math.floor((totalScore/totalpoints)*100);
    const date = 23;
    const name = user.name;
    const dataTosave = JSON.stringify({
        name,
        totalQuestion,
        totalScore,
        wrongAns,
        totalpoints,
        accuracy
    })
        try{
            const response = await axios.post(`${API_URL}/save-data`, dataTosave, {headers: {'Content-Type': 'application/json'}});
            console.log("Data saved: ", response.data.result.name);

        }catch(error){
            console.log("Error saving data:", error);
        }
    
    }

   

    return (
        <div className="containers">
           {showResults ?
            ( <Result score={score} totalQuestions={data.length} selectedAnswers={selectedAnswers}/>)
             : 
           (
            <div className="question-section user-selection">
            <h2 className="question-top user-selection">Question {currqindex+1}</h2>
            <p className="question-name user-selection">{currentQuestion.question}</p>
            <div>
                {currentQuestion.options.map((option, index) =>(
                    <div className="option-div" key={index}>
                        <label className="label-section user-selection">
                            <input  type="radio" 
                                name={`question-${currqindex}`}
                                value={option}
                                checked={selectedAnswers[currqindex] === option}
                                onChange={() => handleOptionSelect(option)}
                            />
                            {option}
                        </label>
                    </div>
                ))

                }
            </div>
            <div className="div-button">
                {currqindex >0 && (
                    <button className="select-button prev user-selection" onClick={handlePrev}>Prev</button>
                )}
                {!isLastQuestion && (
                    <button className="select-button next user-selection" onClick={handleNext}>Next</button>
                )}
                {isLastQuestion && (
                    <button className="select-button submit user-selection" onClick={handleSubmit}>Submit</button>
                )}
              </div>
            </div>
           )}
        </div>
    )
}

export default Question;