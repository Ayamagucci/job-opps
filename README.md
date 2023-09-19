# Indubitably

Indubitably is a job search app that allows users to search for job listings from the Adzuna API, save their favorite job listings, and view them later. This README provides an overview of the app's structure and functionality.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [App Structure](#app-structure)
- [API Integration](#api-integration)
- [Database](#database)
- [Server](#server)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Job Search**: Users can search for job listings by entering job titles and keywords in the search bar.
2. **Filtering**: Users can filter job listings by selecting the number of results they want to display per page.
3. **Display Options**: Users can switch between viewing all job listings and viewing their saved job listings.
4. **Saving Jobs**: Users can save job listings they are interested in, and the app will remember them for future sessions.
5. **Job Details**: Users can view detailed information about each job listing, including the job title, company, location, description, and salary range.
6. **Apply**: Users can click a button to apply for a job, which opens the job listing in a new browser window.
7. **Responsive Design**: The app is designed to be responsive and work well on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **API Integration**: Adzuna API
- **State Management**: React Hooks
- **AJAX**: Axios
- **Authentication**: Local storage and cookies

## Getting Started

To run the app locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using npm or yarn:
3. Create a `.env` file in the root directory and set the following environment variables:
4. Set up a PostgreSQL database using the schema provided in `db/schema.sql`. Update the database configuration in the `db/index.js` file.
5. Run the database migrations to create the necessary tables:
6. Start the server:
7. Start the React app:
8. Access the app in your browser at `http://localhost:3000`.

## App Structure

The app consists of the following main components:

- `App.jsx`: The main component that handles job search, filtering, and displaying job listings.
- `JobsList.jsx`: A component that displays job listings based on the user's selected display option (all or saved).
- `Job.jsx`: A component that displays detailed information about a single job listing and allows users to save and delete jobs.
- `Search.jsx`: A component that provides a search bar for users to enter job titles and keywords.
- `Switcher.jsx`: A component that allows users to switch between viewing all job listings and saved job listings.

## API Integration

The app integrates with the Adzuna API to fetch up-to-date job advertisements for users. It uses Axios to make HTTP requests to the API and processes the retrieved data for display.

## Database

The app uses a PostgreSQL database to store user data and saved job listings. Sequelize is used as an ORM (Object-Relational Mapping) to interact with the database. User information and their associated saved jobs are stored in the database.

## Server

The server component of the app is implemented using Node.js and Express.js. It handles API routes for saving, fetching, and deleting user-saved data. The server listens on the specified port (configured in the `.env` file).

## Contributing

Contributions to the project are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

---

Thank you for using Indubitably Job Search App! If you have any questions or encounter any issues, feel free to reach out to the project maintainers. Happy job hunting!