import { Results } from "../Models/data.js";

export const showData = async (req, res) =>{
    const {name}  = req.body;
    try{
        const response = await Results.findOne({name});
        if(!response){
            return res.status(400).json({success: false, message: "Result not found for this user"});
        }
        res.status(201).json({
            response: response
        })
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
}