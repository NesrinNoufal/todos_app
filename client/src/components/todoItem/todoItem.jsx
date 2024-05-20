import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './todoItem.css';

function TodoItem({ todo, deleteTodo }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/todos/${todo._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Todo updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox} onChange={handleCheckboxClick} role="checkbox" aria-checked>
          <input type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
        </div>
      </td>
      <td><p>{todo.description}</p></td>
      <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td>{moment(todo.createdAt).format('MMM Do YY')}</td>
      <td>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTodo(todo._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TodoItem;