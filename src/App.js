import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
    const [formToggle, setFormToggle] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };

        getTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();

        return data;
    };

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();

        return data;
    };

    const addTask = async (task) => {
        const res = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const data = await res.json();

        setTasks([...tasks, data]);
    };

    // Delete task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updTask),
        });

        const data = await res.json();

        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, reminder: data.reminder } : task
            )
        );
    };

    const toggleForm = () => {
        setFormToggle(!formToggle);
    };

    return (
        <Router>
            <div className="container">
                <Header addFormToggle={toggleForm} formToggle={formToggle} />

                <Route
                    path="/"
                    exact
                    render={(props) => (
                        <>
                            {formToggle && <AddTask addTask={addTask} />}
                            {tasks.length > 0 ? (
                                <Tasks
                                    tasks={tasks}
                                    deleteTask={deleteTask}
                                    toggleReminder={toggleReminder}
                                />
                            ) : (
                                <h2>No tasks to display</h2>
                            )}
                        </>
                    )}
                />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
