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

![MongoDB](https://img.shields.io/badge/-MongoDB-green) ![Express](https://img.shields.io/badge/-Express-blue) ![Next.js](https://img.shields.io/badge/-Next.js-black) ![Node.js](https://img.shields.io/badge/-Node.js-green) ![Shadcn](https://img.shields.io/badge/-Shadcn-blue) ![Tailwind](https://img.shields.io/badge/-Tailwind-red) ![Mongoose](https://img.shields.io/badge/-Mongoose-green)

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

   ```bash
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

| Dependency              | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| bcrypt                  | Hash passwords before storing                         |
| body-parser             | Parse incoming request bodies                         |
| cookie-parser           | Parse Cookie header and populate req.cookies          |
| cors                    | Enable Cross-Origin Resource Sharing                  |
| dotenv                  | Load environment variables from a .env file           |
| exceljs                 | Excel file creation and manipulation                  |
| express                 | Web application framework for Node.js                 |
| express-async-errors    | Error handling for async functions in Express         |
| http-status-codes       | Constants for HTTP status codes                       |
| jsonwebtoken            | Generate and verify JSON Web Tokens                   |
| mongoose                | MongoDB object modeling tool                          |
| multer                  | Middleware for handling multipart/form-data (file uploads) |
| validator               | Validate and sanitize user input                      |

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

