import React, { useState } from "react";
import axios from "axios";

type GoalCardProps = {
  id: string;
  initialTitle: string;
  initialContent: string;
  initialStatus: string;
  updated_at: string;
  created_at: string;
  onStatusChange: (updatedGoal: {
    _id: string;
    title: string;
    content: string;
    status: string;
  }) => void;
};

const GoalCard: React.FC<GoalCardProps> = ({
  id,
  initialTitle,
  initialContent,
  initialStatus,
  onStatusChange,
  updated_at,
  created_at,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState(initialStatus);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCardClicked, setIsCardClicked] = useState(false);

  // const handleTitleClick = () => {
  //   setIsSubmitted(false);
  //   setIsCardClicked(true);
  // };

  // const handleContentClick = () => {
  //   setIsSubmitted(false);
  //   setIsCardClicked(true);
  // };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleDelete = async () => {
    setIsCardClicked(false);
    try {
      await axios.delete(`http://127.0.0.1:5000/${id}`);
      onStatusChange({
        _id: id,
        title: "",
        content: "",
        status: "",
      });
      alert("Goal deleted successfully");
    } catch (error) {
      console.error("There was an error deleting the goal:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitted(true);

      const updatedGoal = await axios.put(`http://127.0.0.1:5000/${id}`, {
        title,
        content,
        status,
      });
      onStatusChange(updatedGoal.data);
      setIsCardClicked(false);
      alert("Goal updated successfully");
    } catch (error) {
      console.error("There was an error updating the goal:", error);
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setContent(initialContent);
    setStatus(initialStatus);
    setIsCardClicked(false);
    setIsSubmitted(false);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleCardClick = () => {
    if (!isCardClicked) {
      setIsCardClicked(true);
      setIsSubmitted(false);
    }
  };

  // const handleCardBlur = (e: React.FocusEvent<HTMLDivElement>) => {
  //   if (!e.currentTarget.contains(e.relatedTarget)) {
  //     setIsCardClicked(false);
  //     handleCancel();
  //   }
  // };

  return (
    <div
    className="bg-white shadow-md rounded-lg p-6 m-4 cursor-pointer w-[80vw] sm:w-[26vw]"
    style={{ minHeight: "260px" }}
      onClick={handleCardClick}
      // onBlur={handleCardBlur}
      tabIndex={-1}
    >
      <div className="mb-4 bg-white"  style={{  minHeight: "200px" }}>
        <div className="bg-white flex justify-between items-center mb-6">
          {isCardClicked ? (
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-full mb-4 max-w-56 py-2 bg-gray-100 border rounded-lg cursor-pointer"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          ) : (
            <div className="bg-white  flex ">
              <p className="bg-white cursor-pointer p-0 m-0">{status}</p>
              
            </div>
          )}
          {
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <i
                style={{ color: "#a8585e" }}
                className="fa-solid fa-trash fa-xl  "
              ></i>
            </button>
          }
        </div>
        {isCardClicked ? (
          <input
            className="bg-white w-full text-xl font-bold  border-b-2 border-gray-300 focus:outline-none"
            type="text"
            value={title}
            onChange={handleTitleChange}
            autoFocus
          />
        ) : (
          <h2
            className="bg-white text-xl  font-bold cursor-pointer"
            // onClick={handleTitleClick}
            style={{ maxWidth: "100%", wordBreak: "break-word" }}
          >
            {title}
          </h2>
        )}
        <div
          className="bg-white"
          style={{
            maxHeight: "120px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {isCardClicked ? (
            <textarea
              style={{ height: "60%", maxHeight: "fit-content" }}
              className="bg-white w-full mt-2  border-b-2 border-gray-300 focus:outline-none"
              value={content}
              onChange={handleContentChange}
              autoFocus
            />
          ) : (
            <p
              className="bg-white mt-2  text-gray-700 cursor-pointer"
              // onClick={handleContentClick}
              style={{ wordBreak: "break-word" }}
            >
              {content}
            </p>
          )}
        </div>
      </div>
      <div className="bg-white">
        {isCardClicked && !isSubmitted && (
          <>
            <button
              className="px-4 py-2 mr-3 bg-white border-black border text-black rounded hover:bg-gray-100 focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-black text-white rounded hover:bg-zinc-700 focus:outline-none"
              onClick={handleSubmit}
            >
              Update
            </button>
          </>
        )}
      </div>
      {!isCardClicked ?(
        <div className="flex justify-end bottom-1 bg-white ">
          <p className="bg-white text-sm p-0 m-0">
            {updated_at ? updated_at : created_at}
          </p>
        </div>
      ):<></>}
    </div>
  );
};

export default GoalCard;
