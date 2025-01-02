"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Task() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainTask, setMainTask] = useState([]);

  // Fetch tasks from Django API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todos/");
      setMainTask(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const submitHandler = async (e) => {
    e.preventDefault();
    if (title && description) {
      try {
        await axios.post("http://127.0.0.1:8000/todos/", {
          title,
          description,
          is_complete: false, // Updated to is_complete
        });
        fetchTasks(); // Refresh tasks after adding
        setTitle("");
        setDescription("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Delete a task
  const deleteHandler = async (id) => {
    try {
      console.log(`Attempting to delete task with ID: ${id}`);
      const response = await axios.delete(`http://127.0.0.1:8000/todos/${id}/`);
      console.log("Task deleted successfully:", response.data);
      fetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error deleting task:", error.response.data);
      } else if (error.request) {
        // No response was received
        console.error("No response from server:", error.request);
      } else {
        // Something else caused the error
        console.error("Unexpected error:", error.message);
      }
    }
  };

  // Toggle task completion
  const toggleCompleteHandler = async (task) => {
    try {
      await axios.put(`http://127.0.0.1:8000/todos/${task.id}/`, {
        title: task.title,
        description: task.description,
        is_complete: !task.is_complete, // Toggle is_complete
      });
      console.log("Task updated successfully");
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  let renderTask = <h1>No Available task</h1>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((task) => (
      <li key={task.id} className="flex item-center justify-between">
        <div>
          <h1
            className={`text-2xl font-bold ${
              task.is_complete ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h1>
          <h2
            className={`text-xl font-semibold ${
              task.is_complete ? "line-through text-gray-500" : ""
            }`}
          >
            {task.description}
          </h2>
        </div>
        <div>
          <button
            onClick={() => toggleCompleteHandler(task)}
            className={`bg-${
              task.is_complete ? "green" : "blue"
            }-500 p-3 rounded`}
          >
            {task.is_complete ? "Completed" : "Mark as Complete"}
          </button>
          <button
            onClick={() => deleteHandler(task.id)}
            className="bg-red-400 p-3 rounded ml-2"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <div className="bg-white grid grid-rows-[20px_1fr_20px] items-center x-overflow-auto justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl text-black">Todo-list</h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap gap-10 bg-slate-500"
      >
        <input
          type="text"
          placeholder="Enter the title"
          className="text-2xl text-black border-zinc-800 border-2 m-5 px-2 py-5 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the description"
          className="text-xl text-black border-zinc-800 border-2 m-5 px-2 py-5 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-500 text-xl text-white font-bold rounded p-4 m-4">
          Add
        </button>
      </form>
      <div className="bg-red-950 max-h-screen p-8 text-2xl w-full max-w-4xl overflow-x-auto overflow-y-auto">
        <ul>{renderTask}</ul>
      </div>
    </div>
  );
}
