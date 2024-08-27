"use client";
import axios from "axios";
import { useState } from "react";

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  setChanged: (changed: boolean) => void;
}

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, setChanged }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreateGoal = async () => {
    if (!title ) {
      setError("Title and content are required");
      return;
    }

    setError(null); // Clear any previous error

    try {
      const res = await axios.post('http://127.0.0.1:5000/new', {
        title,
        content,
        status: status || "Not Started",
      });
      console.log(res);
      // Reset form state on successful submission
      setTitle("");
      setContent("");
      setStatus("");
      onClose(); // Close the modal after successful submission
      setChanged(true)
    } catch (error) {
      console.error("There was an error creating the goal:", error);
      // Optionally handle error here (e.g., show an error message to the user)
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 50 }} 
    >
      <div 
        className="bg-white p-6 rounded-lg w-1/3" 
        style={{ zIndex: 100 }}
      >
        <h2 className="text-xl mb-4 bg-white">Create New Goal</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          required
          className="bg-white rounded-lg border border-slate-500 p-2 w-full mb-4"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="bg-white rounded-lg border border-slate-500 p-2 w-full mb-4"
          rows={4}
        />
        <div className="flex justify-end gap-4 bg-white">
          <button
            onClick={()=>{
              onClose()
              setError("")
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handleCreateGoal}
            disabled={error?true:false}
            className="px-4 py-2 bg-white text-black rounded-lg border border-slate-900"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalModal;
