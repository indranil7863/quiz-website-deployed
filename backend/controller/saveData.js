
import { Results } from "../Models/data.js";

export const saveData = async(req, res) =>{
    const {name, totalQuestion, totalScore, wrongAns,accuracy, date} = req.body;
    
    try {
        // create a new result object to be added
        const quizResult = {
            totalQuestion,
            totalScore,
            wrongAns,
            accuracy,
            date: date || Date.now()
        };

        // find the user by name and push the new result into the 'data' array
        const result = await Results.findOneAndUpdate(
            {name},
            {$push: {data: quizResult}},
            {new: true, upsert: true} // upsert : true creates the user if they don't exist
        );
        if(!result){
            res.status(400).json({success: false, message: "Error saving result!"});
        }
       
        // send the response back to client
        res.status(200).json({success: true, message:"quiz result stored successfully!", result});

    } catch (err) {
        console.error("Error adding quiz result:", err);
        res.status(500).json({message:"error adding quiz result", error: err.message});
    }
}