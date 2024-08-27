"use client";

import React, { useEffect, useState } from "react";
import GoalModal from "./GoalModal";
import axios from "axios";
import GoalCard from "./GoalCard";

const Goal = () => {
  const [goals, setGoals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [changed, setChanged] = useState(false);

  const fetchGoals = async () => {
    try {
    
      const res = await axios.get("http://127.0.0.1:5000");
      console.log(res.data);
      setGoals(res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };
  useEffect(() => {
    fetchGoals();
  }, [changed]);

  const addGoal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateGoalStatus = (updatedGoal) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal._id === updatedGoal._id ? updatedGoal : goal
      )
    );
    setChanged(true);
  };

  return (
    <div className="w-screen p-20">
      <div className="flex justify-start">
        {/* <h1 className="text-2xl">All Goals</h1> */}
      </div>
      <button onClick={addGoal}> Create Goal
      <i className="fa-solid fa-pen"></i>
      </button>
      <div className="flex">
        <div
          className="custom-card"
        >
          {goals?.length ? (
            goals
              .filter((goal) => goal.status === "Not Started")
              .map((goal) => (
                <GoalCard
                  key={goal._id}
                  id={goal._id}
                  initialTitle={goal.title}
                  initialContent={goal.content}
                  initialStatus={goal.status}
                  onStatusChange={updateGoalStatus}
                />
              ))
          ) : (
            <></>
          )}
        </div>
        <div   className="custom-card">
          {goals?.length ? (
            goals
              .filter((goal) => goal.status === "In Progress")
              .map((goal) => (
                <GoalCard
                  key={goal?._id}
                  id={goal?._id}
                  initialTitle={goal?.title}
                  initialContent={goal?.content}
                  initialStatus={goal?.status}
                  onStatusChange={updateGoalStatus}
                />
              ))
          ) : (
            <></>
          )}
        </div>
        <div   className="custom-card">
          {goals?.length ? (
            goals
              .filter((goal) => goal.status === "Completed")
              .map((goal) => (
                <GoalCard
                  key={goal?._id}
                  id={goal?._id}
                  initialTitle={goal?.title}
                  initialContent={goal?.content}
                  initialStatus={goal?.status}
                  onStatusChange={updateGoalStatus}
                />
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <GoalModal isOpen={modalOpen} onClose={closeModal} setChanged={setChanged}/>
    </div>
  );
};

export default Goal;
