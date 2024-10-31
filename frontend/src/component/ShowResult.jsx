import React, { useState } from "react";
import axios from 'axios';
import '../style/ShowResult.css';
import { useAuthStore } from "../store/authStore";

export const ShowResult = () => {
    const [resultData, setResultData] = useState(null); // State to store results
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(false); // Error state
    const {user} = useAuthStore();  // from global object fetch the user name
    const name = user.name; // Replace with dynamic data as needed
    // const RequestURL = "http://localhost:5000/api/show-data";
    const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";


    // Function to fetch current results
    const fetchCurrentResults = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        setError(false); // Reset error state
        try {
            const response = await axios.post(`${API_URL}/show-data`, { name }, { headers: { 'Content-Type': 'application/json' } });
            setResultData(response.data); // Update state with fetched data
            console.log("Data saved: ", response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
            setError(true); // Set error state if fetching fails
        } finally {
            setLoading(false); // Set loading to false after the fetch attempt
        }
    };

    return (
        <div className="main-divs">
            {/* <h2>Show Results</h2> */}
            <div className="divs-button">
            <button className="button-divs" onClick={fetchCurrentResults}>Show Previous Results</button>
            </div>
            {loading ? (
                <p>Loading results...</p> // Show loading state while fetching
            ) : error ? (
                <p>Error fetching results. Please try again.</p> // Show error message
            ) : resultData && resultData.response ? (
                <>
                    <div className="result-div">
                        {/* <h3>Current Results:</h3> */}
                        <p className="user-name">User-Name:<strong className="user">{resultData.response.name}</strong> </p>

                        {resultData.response.data && resultData.response.data.length > 0 ? (
                            resultData.response.data
                            .slice()
                            .sort((a,b) => new Date(b.date) - new Date(a.date))
                            .slice(0, 10)
                            .map((result, index) => (
                                <div key={index} className="single-result">
                                    <p><strong>Result {index + 1}:</strong></p>
                                    <p><strong>Total Questions:</strong> {result.totalQuestion}</p>
                                    <p><strong>Total Score:</strong> {result.totalScore}</p>
                                    <p><strong>Wrong Answers:</strong> {result.wrongAns}</p>
                                    <p><strong>Accuracy:</strong> {result.accuracy}%</p>
                                    <p><strong>Date:</strong> {new Date(result.date).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No results available for you.</p> // Show message if no results
                        )}
                    </div>
                </>
            ) : null}
        </div>
    );
};
