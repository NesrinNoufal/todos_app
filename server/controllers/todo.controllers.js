import Todo from "../Models/todos.models.js";

export const addTodo = async (req, res, next) => {
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
      return next(err);
    }
  };


  export const getTodos = async (req, res, next) => {
    try {
      const todos = await Todo.find({ project: req.header('project-id') });
      return res.status(200).json(todos);
    } catch (err) {
      return next(err);
    }
  };
  
  export const deleteTodo = async (req, res, next) => {
    try {
      const todo = await Todo.findById(req.params.todoId);
    //   if (task.user === req.user.id) {
    //     return next(createError({ status: 401, message: "It's not your todo." }));
    //   }
      await Todo.findByIdAndDelete(req.params.todoId);
      return res.json('Task Deleted Successfully');
    } catch (err) {
      return next(err);
    }
  };