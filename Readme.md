# E-shopper Shopping App

---

## Introduction

---

Welcome to E-shopper, an e-commerce shopping app built using the MERN (MongoDB, Express, React, Node.js) stack and Material-UI (MUI) for the user interface. This project provides both normal user and admin modes, offering a wide range of features to enhance the shopping experience.

## Demo

### Admin Area

https://github.com/jihenmansour/e-shopper/assets/48207144/641489f3-8e05-4c63-aa16-e8f550c7f44c

## Dummy User Accounts

| Email (Admin)     | Password  |
| ----------------- | --------- |
| admin@contact.com | admin@123 |

## Tech Stack

![MongoDB](https://img.shields.io/badge/-MongoDB-green) ![Express](https://img.shields.io/badge/-Express-blue) ![Next](https://img.shields.io/badge/-Next-blue) ![Node.js](https://img.shields.io/badge/-Node.js-green) ![Shadcn](https://img.shields.io/badge/-Shadcn-blue) ![Tailwind](https://img.shields.io/badge/-Tailwind-red) ![Mongoose](https://img.shields.io/badge/-Mongoose-green)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/jihenmansour/e-shopper.git
    cd e-shopper
    ```
2.  Install dependencies:

    ```bash
    cd frontend
    npm install
    ```

    ```bash
    cd backend
    npm install
    ```

3.  Rename Environment Files:

````bash
  mv frontend/.env.example frontend/.env
  ```

```bash
  mv backend/.env.example backend/.env
  ```

4.  Run the app:

  ```bash
  cd frontend &&
  npm run dev
  ```

   ```bash
  cd backend &&
  npm run dev
  ```

  ## Features

### Admin Mode

| Feature                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| Admin Dashboard         | Access to an admin-only dashboard                  |
| User Management         | View and manage users (add, update, delete)        |
| Product Management      | View and manage products (add, update, delete)     |
| Category Management     | View and manage categories (add, update, delete)   |
| Order Management        | View and manage categories (delete)                |



## Dependencies and Libraries

### Backend

| Dependency                              | Description                                           |
| --------------------------------------- | ----------------------------------------------------- |
| @babel/plugin-proposal-class-properties | Babel plugin for class properties                     |
| @strapi/provider-upload-cloudinary      | Cloudinary provider for Strapi uploads                |
| bcryptjs                                | Hash passwords before storing                         |
| body-parser                             | Parse incoming request bodies                         |
| cloudinary                              | Cloud storage for images and videos                   |
| cookie-parser                           | Parse Cookie header and populate req.cookies          |
| cors                                    | Enable Cross-Origin Resource Sharing                  |
| crypto                                  | Cryptographic functions for Node.js                   |
| crypto-js                               | JavaScript library for cryptographic operations       |
| dotenv                                  | Load environment variables from a .env file           |
| express                                 | Web application framework for Node.js                 |
| express-fileupload                      | Middleware to handle file uploads in Express          |
| helmet                                  | Secure HTTP headers middleware                        |
| http-proxy-middleware                   | Proxy requests in development                         |
| jsonwebtoken                            | Generate and verify JSON Web Tokens                   |
| jwt-simple                              | Simple JWT encoding and decoding                      |
| mongoose                                | MongoDB object modeling tool                          |
| nodemailer                              | Send email using Node.js                              |
| nodemon                                 | Monitor for changes in source code and restart server |
| react-chartjs-2                         | React wrapper for Chart.js 2                          |
| stripe                                  | Payment processing library                            |
| validator                               | Validate and sanitize user input                      |

### Frontend

| Dependency                  | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| @emotion/react              | Emotion library for writing CSS with JavaScript              |
| @emotion/styled             | Styled components using Emotion                              |
| @material-ui/core           | UI components library for Material Design                    |
| @material-ui/data-grid      | Data grid component for Material-UI                          |
| @material-ui/icons          | Material Design icons for React components                   |
| @material-ui/lab            | Additional components and utilities for Material-UI          |
| @mui/icons-material         | Material-UI icons for MUI components                         |
| @mui/material               | Material-UI components library                               |
| @mui/styles                 | Styling solution for Material-UI components                  |
| @stripe/react-stripe-js     | React components for Stripe's client-side JavaScript library |
| @stripe/stripe-js           | Stripe's client-side JavaScript library                      |
| @testing-library/user-event | Utilities for simulating events with Testing Library         |
| axios                       | Promise-based HTTP client for the browser and Node.js        |
| highcharts                  | Interactive JavaScript charting library                      |
| highcharts-react-official   | React wrapper for Highcharts library                         |
| node-sass                   | Sass compiler for Node.js                                    |
| react                       | JavaScript library for building user interfaces              |
| react-alert                 | React component for customizable alerts                      |
| react-alert-template-basic  | Basic template for react-alert                               |
| react-dom                   | Entry point to the React DOM library                         |
| react-helmet                | Manage document head in React                                |
| react-js-pagination         | Pagination component for React                               |
| react-material-ui-carousel  | Carousel component for Material-UI                           |
| react-redux                 | State management library for React                           |
| react-router-dom            | Routing library for React applications                       |
| react-scripts               | Create React apps with no build configuration                |
| redux                       | Predictable state container for JavaScript apps              |
| redux-devtools-extension    | Redux DevTools integration                                   |
| redux-thunk                 | Thunk middleware for Redux                                   |
| styled-components           | CSS-in-JS library for styling React components               |
| swiper                      | Mobile touch slider library                                  |
| web-vitals                  | Library for measuring web performance metrics                |

## Hosting Your Complete App on Vercel

This guide will walk you through the process of hosting your complete MERN stack app on Vercel using the `vercel.json` configuration.

### Step 1: Prepare Your Project

- Organize your project with a root directory that contains both frontend and backend folders.
- Ensure both backend and frontend directories have all necessary code and dependencies.
- Create a `vercel.json` file in the root directory.
- Add the following code to `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "./backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "./frotend/build",
      "use": "@vercel/static"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/backend/server.js"
    }
  ]
}
````

- Note :
  - Using this configuration will require you to run npm run build in the frontend directory before deploying to Vercel.
  - Ensure your folder structure looks like this:
    ```json
      root
      ├── backend
      ├── frontend
      │   ├── node_modules
      │   ├── package.json
      │   ├── build
      │   └── ...
      ├── node_modules
      ├── package.json
      ├── vercel.json
      └── ...
    ```

### Step 2: Push Code to GitHub

- Push all your code to GitHub, ignoring the `node_modules` folder and `.env` file.

### Step 3: Create a Vercel Account

- Create an account on Vercel if you haven't already.
- Connect your GitHub account to Vercel.

### Step 4: Create a Vercel Project

- Create a new project in Vercel.
- Select your GitHub repository (e.g., CricketWeapon-store).

### Step 5: Configure Project Settings

- Configure the project settings:
  - Keep the settings as they are.
  - Add all your `.env` variables in the Environment Variables section.

### Step 6: Deploy Your App

- Click on "Deploy" and wait for a few minutes for the deployment process to complete.

### Step 7: Visit Your App

- Once the deployment is successful, click on "Visit" to access your live app.

### Step 8: Enjoy Your App

- Congratulations! Your app is now live and accessible.

## Contributions

| Contributor                                           |
| ----------------------------------------------------- |
| [ImgBotApp](https://github.com/ImgBotApp)             |
| [MehraDevesh2022](https://github.com/MehraDevesh2022) |
| [0dayhunter](https://github.com/MehraDevesh2022)      |
