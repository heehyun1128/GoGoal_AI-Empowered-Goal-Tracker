# GoGoal: AI-empowered Goal Tracker 

## Technologies Used

- FRONT-END: 
    
    NextJS (React), JavaScript, Tailwind CSS

- BACK-END: 
    
    Python, Flask, Pymongo, MongoDB, OpenAI, NextJS

## Run Locally
- Project Setup

    Get your API keys from MongoDB and OpenAI & Add the following api keys in .env file:

    - MONGODB_URL=your mongodb connection key
    - OPENAI_API_KEY=your open ai key
  
- To start frontend
  
    ```
    npm install
    npm run dev
    ```
- To start backend
  
    ```
    pip install pipenv
    pipenv shell
    pipenv install
    flask run
    ``` 

## Deploy on Vercel

Run 
```npm run build```
to build the project

Get your API keys from MongoDB and OpenAI and paste the following Environmental Variables to Vercel and deploy the project

- MONGODB_URL=your mongodb connection key

- OPENAI_API_KEY=your open ai key

## Overview
- List of Goals
    - Card View
  
    ![Screenshot 2024-08-28 at 9 00 25 PM](https://github.com/user-attachments/assets/bbd81502-f11d-4b12-8502-a0ec3b4bbc34)

    - List View

    ![Screenshot 2024-08-28 at 9 04 24 PM](https://github.com/user-attachments/assets/568f1a84-635b-4741-a595-10b6e55535d1)

- Create Goal

![Screenshot 2024-08-28 at 9 00 35 PM](https://github.com/user-attachments/assets/e27bfa44-041f-4d9d-9c1a-dac85978bd31)

- Error Handling

![Screenshot 2024-08-28 at 9 01 14 PM](https://github.com/user-attachments/assets/668cafc1-4098-48f3-aca9-4b725826c5f8)

- Update Goal
  
![Screenshot 2024-08-28 at 9 01 57 PM](https://github.com/user-attachments/assets/3bd40b51-bf66-4414-9b1f-d0fe652e8d59)






## AI Features

- Generate motivational quotes

  ![Screenshot 2024-08-28 at 9 06 39 PM](https://github.com/user-attachments/assets/b6d8cf56-3df7-43cf-8431-f1345def5b39)

- List goals that are due today

  ![Screenshot 2024-08-28 at 9 07 06 PM](https://github.com/user-attachments/assets/d09c7225-abc4-4c50-85d6-b2582a946350)
