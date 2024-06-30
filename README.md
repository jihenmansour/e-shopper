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

| Dependency                      | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| @hookform/resolvers             | Resolvers for `react-hook-form` validation            |
| @radix-ui/react-alert-dialog    | Radix UI component for alert dialogs                  |
| @radix-ui/react-checkbox        | Radix UI component for checkboxes                     |
| @radix-ui/react-dialog          | Radix UI component for dialogs                        |
| @radix-ui/react-dropdown-menu   | Radix UI component for dropdown menus                 |
| @radix-ui/react-icons           | Radix UI icons library                                |
| @radix-ui/react-label           | Radix UI component for labels                         |
| @radix-ui/react-select          | Radix UI component for select menus                   |
| @radix-ui/react-slot            | Radix UI component for slots                          |
| @radix-ui/react-toast           | Radix UI component for toast notifications            |
| @radix-ui/react-tooltip         | Radix UI component for tooltips                       |
| @tanstack/react-table           | Powerful table library for React                      |
| axios                           | Promise-based HTTP client for the browser and Node.js |
| chart.js                        | JavaScript charting library                           |
| class-variance-authority        | Utility for conditional class name management         |
| clsx                            | Utility for constructing `className` strings          |
| cmdk                            | Command menu component for React                      |
| js-cookie                       | JavaScript API for handling cookies                   |
| lucide-react                    | React component for Lucide icons                      |
| next                            | React framework for server-side rendering and static site generation |
| react                           | JavaScript library for building user interfaces       |
| react-chartjs-2                 | React wrapper for Chart.js                            |
| react-dom                       | React package for working with the DOM                |
| react-hook-form                 | Performant, flexible, and extensible forms with easy-to-use validation |
| tailwind-merge                  | Utility for merging Tailwind CSS classes              |
| tailwindcss-animate             | Tailwind CSS plugin for animations                    |
| zod                             | TypeScript-first schema declaration and validation library |
| zod-form-data                   | Transform `FormData` into Zod schemas                 |


