# Smart Customer Support System

The **Smart Customer Support System** is a web application designed to provide seamless customer support with features like user authentication, modern UI, and AI-powered chat responses. It utilizes a combination of frontend and backend technologies, including React, Redux, Django Rest Framework, and OpenAI's API.

## Technologies Used

- **Frontend:**
  - **React**: For building user interfaces.
  - **Redux**: For state management.
  - **Tailwind CSS**: For styling.
  - **Shadcn UI**: For UI components.
  
- **Backend:**
  - **Django Rest Framework**: For building RESTful APIs.
  - **Neon Serverless PostgreSQL**: For database management.
  - **JWT**: For authentication and secure token management.

- **AI Integration:**
  - **OpenAI API**: For generating AI-based chat responses.

## Features

- **User Authentication**: Secure login/logout with JWT tokens.
- **Modern UI**: Responsive design with Tailwind CSS and Shadcn UI.
- **AI Chat**: Integrated with OpenAI API for intelligent chat responses.
- **Dark/Light Mode**: Toggle between themes.

## Setup

### Frontend

1. **Clone the repository:**

   ``` https://github.com/ArfanAbid/Smart-Customer-Support-System ```

2. **Navigate to the frontend directory:**

    cd smart-customer-support-system/frontend

3. **Install dependencies:**   

    ```npm install```

4. **Create a .env file in the frontend directory with the following variables:**

    `VITE_API_URL=https://your-backend-api-url.com or http://127.0.0.1:8000/`

5. **Run the development server:** 

    `npm run dev`


### Backend

1. **Navigate to the backend directory:**

    cd smart-customer-support-system/backend

2. **Create a virtual environment and activate it:**

    `python -m venv venv`

    `source venv/bin/activate`  # On Windows use `venv\Scripts\activate`

3. **Install dependencies:**

    `pip install -r requirements.txt`

4. **Apply migrations:**

    Set database setting if using Serverless DB 

    `python manage.py migrate`

5. **Create a .env file in the backend directory with your database and API (openAI ChatBot Api)configuration.**    

6. **Run the development server:**

    `python manage.py runserver`

## API Endpoints

- POST /api/user/login/: User login.
- POST /api/user/register/: User registration.
- GET /api/user/profile/: Get user profile (requires authentication).
- POST /api/chat/: Send a message to the chat system and get a response.

### Environment Variables

### Frontend:

- VITE_API_URL: The base URL for the backend API.

### Backend:

- DATABASE_URL: URL for Neon Serverless PostgreSQL database.
- SECRET_KEY: Django secret key.
- OPENAI_API_KEY: API key for OpenAI.


## Contributing
Feel free to open issues or submit pull requests. For major changes, please open an issue first to discuss what you would like to change.


