import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({

  description:
   { 
     type: String,
     required: true 
    },
  status: 
   { 
     type: String,
     enum: ['pending', 'completed'],
     default: 'pending'
   },
  createdTime:
   {
     type: Date, 
     default: Date.now 
    },
  project:
   {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Project', 
    //  required: true 
    }
});

const Todo = mongoose.model('Todo', taskSchema);

export default Todo;
