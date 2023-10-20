import React, { useState, useEffect, useMemo } from 'react';
import useTasks from '../components/useTasks';

export const TodoList = () => {
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const { tasks, addTask, deleteTask, toggleTask } = useTasks(initialTasks);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    if (filter === 'done') {
      return tasks.filter((task) => task.done);
    } else if (filter === 'notDone') {
      return tasks.filter((task) => !task.done);
    }
    return tasks;
  }, [tasks, filter]);

  const handleAddTask = (taskText) => {
    if (taskText.trim() !== '') {
      addTask(taskText.trim());
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      handleAddTask(e.target.value.trim());
      e.target.value = '';
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        placeholder="Add a task"
        onKeyUp={handleKeyUp}
      />
      
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('done')}>Done</button>
        <button onClick={() => setFilter('notDone')}>Not Done</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: task.done ? 'line-through' : 'none' }}
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
