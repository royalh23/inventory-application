# Inventory Application

An inventory management application built with Node.js, Express, and PostgeSQL, designed to manage game inventory efficiently.

## Features

- **Games Management**: Add, update, and delete games in the inventory.
- **Genres Management**: Manage game genres with CRUD operations.
- **User-Friendly Interface**: Simple and clean UI built with EJS.

## Project Structure

- **controllers/**: Contains logic for handling requests related to games and genres.
- **db/**: Database configuration, queries and connection files.
- **middleware/**: Validation middleware for validating and sanitazing form data.
- **public/**: Static assets like CSS and images.
- **routes/**: Application routes for games and genres.
- **views/**: EJS templates for rendering UI.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/royalh23/inventory-application.git
```

2. Navigate to the project directory:

```bash
cd inventory-application
```

3. Install the dependencies:

```bash
npm install
```

## Usage

1. Populate the remote database:

```bash
node db/populate.js <database_connection_string>
```

2. Start the server:

```bash
npm run preview
```

3. Open your browser and go to http://localhost:3000 to use the application.
