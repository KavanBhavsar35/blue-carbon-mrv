# Blue Carnbon MRV

## Tech 
Flask, SQLAlchemy, web3

## Steps to add new table
- Create Model in app/models/ with proper relationships and constraints
- Create Schemas in app/schemas/ for serialization/validation
- Create Service in app/services/ for business logic
- Create Resources in app/resources/ for API endpoints
- Register Resources in app/__init__.py

## Folder Structure
```bash
blue-carbon-mrv/
├── backend/
│   ├── app/
│   │   ├── __init__.py                 # App factory & central initialization
│   │   ├── config.py                   # Configuration management
│   │   ├── extensions.py               # Flask extensions
│   │   ├── database/
│   │   │   ├── __init__.py
│   │   │   ├── base.py                 # Base model & DB session
│   │   │   └── migrations/             # Alembic migrations
│   │   ├── models/
│   │   │   ├── __init__.py             # Central model registry
│   │   │   ├── user.py                 # User model
│   │   │   ├── user_profile.py         # UserProfile model
│   │   │   ├── project.py              # Project model
│   │   │   └── ... (other models)
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user_schemas.py
│   │   │   ├── user_profile_schemas.py
│   │   │   └── ...
│   │   ├── resources/
│   │   │   ├── __init__.py             # Resource registry
│   │   │   ├── user_resources.py
│   │   │   ├── user_profile_resources.py
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── user_service.py
│   │   │   ├── blockchain_service.py
│   │   │   ├── iot_service.py
│   │   │   └── ...
│   │   ├── blueprints/
│   │   │   ├── __init__.py
│   │   │   ├── api.py                  # Main API blueprint
│   │   │   ├── blockchain.py
│   │   │   └── aimodels.py
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   ├── validators.py
│   │   │   ├── decorators.py
│   │   │   └── helpers.py
│   │   └── middleware/
│   │       ├── __init__.py
│   │       ├── auth.py
│   │       └── logging.py
│   ├── migrations/                     # Alembic migrations
│   ├── contracts/                      # Smart contracts
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   └── run.py                         # App entry point
```

## Prompt to generate new Table
**CONTEXT:** I need to add a new table to our Flask Blue Carbon MRV backend. Here's our current structure and requirements.

**BACKEND STRUCTURE:**
```
blue-carbon-mrv/backend/
├── app/
│   ├── models/              # Database models
│   ├── schemas/             # Marshmallow schemas
│   ├── services/            # Business logic
│   ├── resources/           # API endpoints
│   ├── database/            # DB configuration
│   └── __init__.py          # App factory
├── migrations/              # Alembic migrations
└── run.py                   # Entry point
```

**PRISMA SCHEMA FOR NEW TABLE:**
```prisma
// PASTE YOUR PRISMA MODEL DEFINITION HERE
// Example:
model Project {
  id        String   @id @default(uuid())
  name      String
  status    ProjectStatus @default(PENDING)
  // ... other fields and relations
}
```

**REQUIRED FILES TO GENERATE:**

1. **Model File** (`app/models/[table_name].py`)
2. **Schema File** (`app/schemas/[table_name]_schemas.py`) 
3. **Service File** (`app/services/[table_name]_service.py`)
4. **Resource File** (`app/resources/[table_name]_resources.py`)

**IMPLEMENTATION REQUIREMENTS:**

**For Model:**
- Inherit from `BaseModel` in `app/database/base.py`
- Define proper SQLAlchemy relationships with cascade rules
- Add `__tablename__` matching Prisma model name
- Include field validations using `@validates` decorator
- Add `to_dict()` method for serialization
- Add useful class methods (get_by_x, etc.)

**For Schemas:**
- Create separate schemas for Create, Update, and Response
- Include proper validation rules
- Handle nested relationships appropriately
- Use Marshmallow validators for field constraints

**For Service:**
- Implement CRUD operations with proper error handling
- Include business logic specific to this table
- Add logging for important operations
- Handle database transactions properly

**For Resources:**
- Implement standard REST endpoints (GET, POST, PUT, DELETE)
- Include proper error handling and status codes
- Add request parsing where needed
- Include logging for API calls

**STEPS TO ADD NEW TABLE:**

1. **Create Model** in `app/models/[table_name].py`
2. **Create Schemas** in `app/schemas/[table_name]_schemas.py`
3. **Create Service** in `app/services/[table_name]_service.py`
4. **Create Resources** in `app/resources/[table_name]_resources.py`
5. **Register Resources** in `app/resources/__init__.py`
6. **Update Documentation** with table relationships and endpoints

**REGISTRATION CODE TO ADD:**
```python
# In app/resources/__init__.py
from app.resources.[table_name]_resources import [TableName]Resource, [TableName]ListResource

api_instance.add_resource([TableName]ListResource, '/[table-name]')
api_instance.add_resource([TableName]Resource, '/[table-name]/<string:[table_name]_id>')
```

**FILES TO INCLUDE IN CONTEXT:**
- `app/database/base.py` (for BaseModel reference)
- `app/models/user.py` (as example)
- `app/schemas/user_schemas.py` (as example) 
- `app/services/user_service.py` (as example)
- `app/resources/user_resources.py` (as example)
- `app/resources/__init__.py` (for registration pattern)

**OUTPUT FORMAT:**
Please generate complete, runnable code for all 4 files following our existing patterns and include the registration code snippet.

