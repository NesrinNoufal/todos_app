import express from "express";
import {addTodo,getTodos,deleteTodo} from '../controllers/todo.controllers.js';


const todosRouter = express();

todosRouter.post('/addTodo',addTodo);
todosRouter.get('/getTodos',getTodos);
todosRouter.post('/delete',deleteTodo);


export default todosRouter;