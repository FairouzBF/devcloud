import { useState, useCallback } from 'react';

export default function useTasks(initialTasks) {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = useCallback(
    (text) => {
      setTasks([...tasks, { text, done: false }]);
    },
    [tasks],
  );

  const deleteTask = useCallback(
    (index) => {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    },
    [tasks],
  );

  const toggleTask = useCallback(
    (index) => {
      const newTasks = tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task,
      );
      setTasks(newTasks);
    },
    [tasks],
  );

  return { tasks, addTask, deleteTask, toggleTask };
}
