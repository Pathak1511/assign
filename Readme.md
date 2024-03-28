# Instagram Clone Project

## Description

This project is a clone of Instagram, where users can upload photos with descriptions and interact with each other's posts by liking and commenting.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely using Clerk.
- **Image Upload**: Users can upload photos up to 5 MB in size along with optional descriptions before posting.
- **Public Availability**: Once uploaded, posts are made available to the public for viewing, liking, and commenting.
- **Material-UI Design**: The user interface is designed using Material-UI for a modern and responsive look.

## Technologies Used

- **Next.js**: Utilized for server-side rendering, routing, and authentication.
- **Axios**: Used for making HTTP requests to the server for uploading and fetching data.
- **Socket.io**: Implemented partially. Will implemented in future.
- **MongoDB**: The database of choice for storing user information, posts, likes, and comments.
- **Material-UI**: Employed for designing the user interface and ensuring a consistent design system.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Pathak1511/assign.git

   ```

2. Install dependencies:

   ```
   cd client/assign
   npm install
   ```

3. Env File

- Env for client/assign
  Sign up to clerk and create your own User Management Platform and get api key and then create .env.local

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_PUBLIC_KEY>
CLERK_SECRET_KEY=<YOUR_SECRET_KEY>
```

- Env for server
  create mongodb database and create .env file in server

```bash
PORT=5000
DATABASE=<YOUR_DATABASE_LINK>
NODE_ENV=development
```

4. Start the development server:

   ```
   cd server
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Sign up for an account or log in if you already have one.
2. Upload photos along with optional descriptions.
3. Interact with other users' posts by liking and commenting.
