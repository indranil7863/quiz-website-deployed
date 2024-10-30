import mongoose from 'mongoose';


const dataFormat = new mongoose.Schema({
    totalQuestion: Number,
    totalScore: Number,
    wrongAns: Number,
    accuracy: String,
    date:{
        type: Date,
        default: Date.now
    }
})
const userData = new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        reuquired: true
    },
    data:[dataFormat]
}, {timestamps: true});

export const Results = mongoose.model("Results", userData);