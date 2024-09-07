import React, { useState, useEffect } from "react";
import { PlusCircle, Edit2, Trash2, X, Check, Tag } from "lucide-react";
import axios from "axios";

const App = () => {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [editId, setEditId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/habits").then((res) => setHabits(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHabit = { name, description, category, tags: tags.split(",").map(tag => tag.trim()) };

    if (editId) {
      axios.put(`http://localhost:5000/api/habits/${editId}`, newHabit).then((res) => {
        setHabits(habits.map((habit) => (habit._id === editId ? res.data : habit)));
        clearForm();
      });
    } else {
      axios.post("http://localhost:5000/api/habits", newHabit).then((res) => {
        setHabits([...habits, res.data]);
        clearForm();
      });
    }
    setIsFormVisible(false);
  };

  const deleteHabit = (id) => {
    axios.delete(`http://localhost:5000/api/habits/${id}`).then(() => {
      setHabits(habits.filter((habit) => habit._id !== id));
    });
  };

  const handleEdit = (habit) => {
    setEditId(habit._id);
    setName(habit.name);
    setDescription(habit.description);
    setCategory(habit.category);
    setTags(habit.tags.join(", "));
    setIsFormVisible(true);
  };

  const clearForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setTags("");
    setEditId(null);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      clearForm();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Daily Habit Tracker</h1>

        <button
          onClick={toggleForm}
          className="mb-8 flex items-center justify-center w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {isFormVisible ? (
            <>
              <X className="w-5 h-5 mr-2" /> Close Form
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 mr-2" /> {editId ? "Edit Habit" : "Add New Habit"}
            </>
          )}
        </button>

        {isFormVisible && (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-8 animate-fade-in-down">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{editId ? "Edit Habit" : "Add a New Habit"}</h2>
            <input
              type="text"
              placeholder="Habit Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-6 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {editId ? "Update Habit" : "Add Habit"}
              </button>
            </div>
          </form>
        )}

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Habits</h2>
          {habits.length > 0 ? (
            <ul className="space-y-4">
              {habits.map((habit) => (
                <li
                  key={habit._id}
                  className="bg-gray-50 rounded-lg p-4 shadow transition duration-300 hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{habit.name}</h3>
                      <p className="text-gray-600 mt-1">{habit.description}</p>
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded mt-2">
                        {habit.category}
                      </span>
                      <div className="flex flex-wrap mt-2">
                        {habit.tags.map((tag, index) => (
                          <span key={index} className="flex items-center bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-2">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(habit)}
                        className="text-yellow-600 hover:text-yellow-700 transition duration-300"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteHabit(habit._id)}
                        className="text-red-600 hover:text-red-700 transition duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No habits added yet. Start by adding a new habit!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;