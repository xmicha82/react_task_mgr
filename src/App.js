import { useState } from "react";
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

function App() {
  const [formToggle, setFormToggle] = useState(false);
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: "Doctors Appointment",
        day: "Feb 5th at 14:30",
        reminder: true,
    },
    {
        id: 2,
        text: "Meeting at school",
        day: "Feb 6th at 13:00",
        reminder: true,
    },
    {
        id: 3,
        text: "Food Shopping",
        day: "Feb 6th at 15:00",
        reminder: false,
    },
]);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;

    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  };

  const toggleForm = () => {
    setFormToggle(!formToggle);
  }

  return (
  <div className="container">
    <Header addFormToggle={toggleForm} formToggle={formToggle} />
    {formToggle && <AddTask addTask={addTask} />}
    {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder} /> : <h2>No tasks to display</h2>}
  </div>
  );
}


export default App;
