# Blue Carbon Backend

This project is a backend application for managing blue carbon projects, utilizing Flask and SQLAlchemy for web development and database management.

## Project Structure

```
bluecarbon-backend
├── app
│   ├── __init__.py        # Initializes the Flask application and sets up the database connection
│   ├── models.py          # Defines the database models corresponding to the SQL schema
│   ├── routes.py          # Contains the route definitions for the application
│   ├── schemas.py         # Defines serialization schemas for the models
│   └── utils.py           # Includes utility functions for data processing and validation
├── sih_db.py              # Main application logic, including Flask app setup and routes
├── schema.sql             # SQL schema for creating the database structure
├── requirements.txt       # Lists the dependencies required for the project
├── config.py              # Configuration settings for the Flask application
└── README.md              # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd bluecarbon-backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up the database:**
   - Run the SQL commands in `schema.sql` to create the necessary tables and types in your database.

5. **Run the application:**
   ```
   python sih_db.py
   ```

## Usage

- Access the application at `http://127.0.0.1:5000/`.
- The API endpoints can be defined in `app/routes.py`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.