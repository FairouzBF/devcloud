import React, { useState, useEffect, useMemo } from 'react';
import useTasks from '../components/useTasks';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

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
    <Grid container spacing={1} sx={{ m: 2 }}>
      <Grid item xs={12}>
        <h1>Task List</h1>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Input type="text" placeholder="Add a task" onKeyUp={handleKeyUp} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          onClick={() => handleAddTask(document.querySelector('input').value)}
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => setFilter('all')}
          startIcon={<ListIcon />}
        >
          All
        </Button>
        <Button
          variant="contained"
          onClick={() => setFilter('done')}
          startIcon={<DoneIcon />}
        >
          Done
        </Button>
        <Button
          variant="contained"
          onClick={() => setFilter('notDone')}
          startIcon={<CloseIcon />}
        >
          Not Done
        </Button>
      </Grid>
      <Grid item xs={12}>
        <List>
          {filteredTasks.map((task, index) => (
            <ListItem key={index}>
              <Grid item xs={12} sm={6}>
                <span
                  style={{
                    textDecoration: task.done ? 'line-through' : 'none',
                  }}
                  onClick={() => toggleTask(index)}
                >
                  <Typography>
                    {task.done ? '✅' : '❌'}
                    {task.text}
                  </Typography>
                </span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <IconButton
                  variant="contained"
                  onClick={() => deleteTask(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
