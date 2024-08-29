"use client";

import React, { useEffect, useRef, useState } from "react";
import GoalModal from "./GoalModal";
import axios from "axios";
import GoalCard from "./GoalCard";
import Typed from "typed.js";

interface Goal {
  _id: string;
  title: string;
  content: string;
  due_date: string;
  status: string;
  updated_at: string;
  created_at: string;
}

const Goal = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [listView, setListView] = useState(false);
  const [quote, setQuote] = useState("");
  const [dueToday, setDueToday] = useState("");

  const el = useRef(null);
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
  const generateQuote = async () => {
    const quote = await axios.post(
      "/api/quote",
      `create one sentence or maximum of three sentences of motivational quotes
for the user to achive or set up a goal`
    );
    console.log(quote.data.quote);
    setQuote(quote.data.quote);
  };
  const getDueToday = async () => {
    const formatDate = (date: any) => {
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();

      return `${month}-${day}-${year}`;
    };

    const todayDate = formatDate(new Date());

    const dueToday = await axios.post(
      "/api/quote",
      `You are provided with a list of goals which is ${goals}, each having a due_date. Your task is to find and return the titles of **all** goals that are due today. 
      The list is an array of objects structured as follows:
    
      [
        {
          "_id": "123",
          "title": "Goal A",
          "content": "Achieving Goal A",
          "status": "In Progress",
          "due_date": "08/27/2024",
          "created_at": "",
          "updated_at": ""
        },
        ...
      ]
    
      The current date is ${todayDate}. Check if the "due_date" property of each object in this  array: ${JSON.stringify(
        goals.map((goal) => ({
          due_date: goal.due_date,
          title: goal.title,
        }))
      )} matches "${todayDate}".
      If it does, return the titles of those goals. If multiple goals are due today, list all of them in a single response.
    
      
    
      Return the result using the format: " Goal A --- Goal B"
      If no goals are due today, simply respond with: "No goals are due today." Do not provide any explanations or additional text.
      `
    );

    setDueToday(dueToday.data.quote);
  };

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [`${quote}`],
      typeSpeed: 50,
      loop: false,
    });

    return () => {
      typed.destroy();
    };
  }, [quote]);

  useEffect(() => {
    fetchGoals();
    generateQuote();
  }, [changed]);

  useEffect(() => {
    if (goals.length > 0) {
      getDueToday();
    }
  }, [goals, changed]);

  const addGoal = () => {
    setModalOpen(true);
    setChanged(!changed);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateGoalStatus = (updatedGoal: any) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal._id === updatedGoal._id ? updatedGoal : goal
      )
    );
    setChanged(!changed);
  };

  const seeListView = () => {
    setListView(!listView);
  };

  return (
    <div className="w-screen p-2 lg:p-20">
      <div className="flex flex-col sm:flex-row justify-between ">
        <button
          className="px-6 py-2 rounded-lg flex items-center justify-center text-black mb-8 fade-in-bottom mr-6"
          style={{ backgroundColor: "black", height: "40px" }}
          onClick={addGoal}
        >
          <p
            className="mr-4 hidden  lg:block"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Create Goal
          </p>
          <i
            className="fa-solid fa-pen"
            style={{ backgroundColor: "black", color: "white" }}
          ></i>
        </button>

        <div
          className="m-0 p-0 flex justify-end w-[90vw] lg:w-[50vw] mb-10"
          style={{ height: "fit-content" }}
        >
          <h1 className="text-md" ref={el}></h1>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-4 text-focus-in">DUE TODAY</h4>
        <ul className="list-disc pl-5">
          {dueToday.split("---").map((due, index) => (
            <li key={index} className="mb-2">
              {due}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="px-6 py-2 rounded-lg flex items-center justify-center text-black mb-8 fade-in-bottom mr-6 "
        style={{ backgroundColor: "black", height: "40px" }}
        onClick={seeListView}
      >
       {!listView && <p
          className="mr-4 hidden  lg:block"
          style={{ backgroundColor: "black", color: "white" }}
        >
          List View
        </p>}
       {listView && <p
          className="mr-4 hidden  lg:block"
          style={{ backgroundColor: "black", color: "white" }}
        >
          Card View
        </p>}
        <div className="bg-black p-1 ">
        <i className="fa-solid bg-black text-white  fa-list"></i>
        </div>
      </button>
      {!listView && (
        <div className="flex flex-col sm:flex-row ">
          <div className="custom-card text-focus-in">
            <h1 className="rounded p-4 shadow-md bg-red-400 ">Not Started</h1>
            {goals?.length ? (
              goals
                .filter((goal) => goal.status === "Not Started")
                .map((goal) => (
                  <GoalCard
                    key={goal?._id}
                    id={goal?._id}
                    initialTitle={goal?.title}
                    initialContent={goal?.content}
                    initialStatus={goal?.status}
                    initialDueDate={goal?.due_date}
                    updated_at={goal?.updated_at}
                    created_at={goal?.created_at}
                    onStatusChange={updateGoalStatus}
                  />
                ))
            ) : (
              <div className="no-goal">
                <h2 className="bg-transparent">No goals to display.</h2>
                <h2 className="bg-transparent">
                  Start by creating a new goal!
                </h2>
              </div>
            )}
          </div>
          <div className="custom-card text-focus-in">
            <h1 className="rounded p-4 shadow-md bg-yellow-500">In Progress</h1>
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
                    initialDueDate={goal?.due_date}
                    onStatusChange={updateGoalStatus}
                    updated_at={goal?.updated_at}
                    created_at={goal?.created_at}
                  />
                ))
            ) : (
              <div className="no-goal">
                <h2 className="bg-transparent">
                  You currently have no goals in progress.
                </h2>
                <h2 className="bg-transparent">
                  Let&apos; start a new one today!
                </h2>
              </div>
            )}
          </div>
          <div className="custom-card text-focus-in">
            <h1 className="rounded p-4 shadow-md bg-green-500 ">Completed</h1>
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
                    initialDueDate={goal?.due_date}
                    updated_at={goal?.updated_at}
                    created_at={goal?.created_at}
                    onStatusChange={updateGoalStatus}
                  />
                ))
            ) : (
              <div className="no-goal">
                <h2 className="bg-transparent">
                  You currently have no completed goals.
                </h2>
                <h2 className="bg-transparent">
                  Ready to start a new one today?
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
     {listView && (
  <div className="text-focus-in">
    {goals.sort((a:Goal, b:Goal) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime()).map((goal) => (
      <div className="bg-white rounded mb-2 p-4" key={goal._id}>
        <strong className="bg-white">Title:</strong> {goal.title} <br />
        <strong className="bg-white">Content:</strong> {goal.content} <br />
        <strong className="bg-white">Status:</strong> {goal.status} <br />
        <strong className="bg-white">Due Date:</strong> {goal.due_date}
      </div>
    ))}
  </div>
)}

      <GoalModal
        isOpen={modalOpen}
        onClose={closeModal}
        setChanged={setChanged}
        changed={changed}
      />
    </div>
  );
};

export default Goal;
