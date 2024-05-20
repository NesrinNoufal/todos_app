
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import TodoItem from '../todoItem/todoItem';
import classes from './project.css';

const Project = () => {
  const { projectId } = useParams();
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  

  const handleAddTodo = async () => {
    try {
        
        
        const response = await fetch('http://localhost:5000/api/todos/addTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'project-id': '{projectId}'
            },
            body: JSON.stringify({ title: newTodo })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Todo added successfully:', responseData);

        // Optionally, clear the input field after successful submission
        setNewTodo("");
    } catch (error) {
        console.error('Error adding project:', error.message);
        // You can display an error message to the user if needed
    }
};

const getTodos = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/todos/getTodos');
      setTodoList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);


  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      toast.success('Todo deleted');
      setTodoList(todoList.filter((todo) => todo._id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  return (
    // <div>
    //   <h2>Project Details</h2>
    //   <p>Project ID: {projectId}</p>
    //   {/* Fetch project details using projectId */}
    // </div>

<div>

  <div className='create_form'>
  <input type="text" placeholder='Enter todo Name' onChange={(e) => setNewTodo(e.target.value)}/>
  <button type="button" onClick={handleAddTodo}>Add</button>

</div>


{/* <h2>{project.title}</h2> */}
{todoList.length > 0 ? (
  <table className={classes.taskList_table}>
    <tbody>
      {todoList.map((todo) => (
        <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </tbody>
  </table>
) : (
  'No Todo Found. Create a new todo'
)}

<div className='project-button'>
    <button>Export</button>
</div>
</div>
);
}
  

export default Project;




