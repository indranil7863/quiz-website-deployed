
import React from "react";
import '../style/Result.css'
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";



const Result = ({score, totalQuestions, selectedAnswers}) =>{
    
    const {user} = useAuthStore();
    const totalAttempt = Object.keys(selectedAnswers).length;
    const point = parseInt(score) * 5;
    const totalpoints = parseInt(totalQuestions) *5;

    const accuracy = Math.floor((point/totalpoints)*100);
    return (
        <div className="main-div">
            <h2 className="head-text user-selection">Quiz Results</h2>
            <div className="options-div user-selection" >
                <p>User name: <span className="span-tag user-selection">{user.name}</span></p>
                <p>Total Questions:<span className="span-tag user-selection">{totalQuestions}</span> </p>
                <p>Total Attempts:<span className="span-tag user-selection">{totalAttempt} </span></p>
                <p>Correct Attempt:<span className="span-tag user-selection"> {score}</span></p>
                <p>Your Score:<span className="span-tag user-selection"> {point} out of {totalpoints}</span></p>
                <p>Accuracy:<span className="span-tag user-selection">{accuracy}% </span></p>
            
            </div>
          <div>
          <Link className="buttons-div user-selection" to={'/home'}>Restart</Link>
          </div>
        </div>

    )
}
export default Result;