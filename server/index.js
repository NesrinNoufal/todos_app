import express from "express";
import connectToMongodb from "./db/connectToMongodb.js";
import AuthRoutes from './routes/auth.routes.js';
import ProjectRoutes from './routes/project.routes.js';
import cors from 'cors';
import path from "path";
import User from "./Models/user.model.js";
import Project from "./Models/project.model.js";
import 'dotenv/config';
import { checkAuth } from "./utils/checkAuth.js";
import TodoRoutes from './routes/todo.routes.js';
import Todo from "./Models/todos.models.js";


const app = express ();
const PORT = 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));

app.use('/api/auth',AuthRoutes);
// app.use('api/projects',ProjectRoutes);

// routes
app.use('/api/projects', checkAuth,ProjectRoutes);
app.use('api/todos',TodoRoutes);



app.post('/api/todos/addTodo', async (req,res) =>{
    console.log("addTodo function called");
    console.log("addTodo function executed");
    const newTodo = new Todo({
      description: req.body.title,
    //   project: req.header('project-id')
      
    });
    console.log("newTODO",newTodo);
    try {
      const savedTodo = await newTodo.save();
      return res.status(200).json(savedTodo);
    } catch (err) {
    //   return next(err);
        console.log("error in adding todo:",err)
    }
})
app.get('/api/todos/getTodos', async (req,res) =>{
    try {
        const todos = await Todo.find({
            //  project: req.header('project-id') 
        });
        return res.status(200).json(todos);
      } catch (err) {
        // return next(err);
        console.log("error in adding todo:",err)
      }
})

app.get('/api/todos/getTodos', async (req,res) =>{
    try {
        const todo = await Todo.findById(req.params.todoId);
      //   if (task.user === req.user.id) {
      //     return next(createError({ status: 401, message: "It's not your todo." }));
      //   }
        await Todo.findByIdAndDelete(req.params.todoId);
        return res.json('Task Deleted Successfully');
      } catch (err) {
        // return next(err);
        console.log("error in deleting todo:",err)
      }
})

app.listen(PORT, () => {
    connectToMongodb();
    console.log(`Server running at port ${PORT}`);
});




// app.use(express.static(path.join(__dirname, "/frontend/build")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });



// app.get('/', () =>{
    
//     console.log("Server running ");
// })