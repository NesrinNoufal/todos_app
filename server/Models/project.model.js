import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title : {
        type:String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true
    },
    tasks: [{
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Task' 
        }]
    
});

const Project = mongoose.model("Project", projectSchema); 

export default Project;





