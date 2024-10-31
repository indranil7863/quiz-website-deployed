import React from "react";
import { Link } from "react-router-dom";
import '../style/Home.css';

const Home = () =>{


    return (
        <div className="container user-selection">
            <div className="box user-selection">
            <h1 className="heading user-selection">Quiz Information</h1>
            <ol className="list user-selection">
                <li>You will asked 10 questions one after another</li>
                <li>5 points is awarded for the correct answer.</li>
                <li>Each question has Four options. You can choose only one option</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
                <li>You can see your previous Results in Results section.</li>
            </ol>
            <div className="button-div">
                <Link className="button" to={"/questions"}>Start Quiz</Link>
                <Link className="button" to={"/show-result" }>Results</Link>
               
            </div>
            </div>
        </div>
    )
}

export default Home;