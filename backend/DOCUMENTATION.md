# Database Schema Documentation

## TABLE: users
#### RELATIONSHIPS:
  - One-to-One: UserProfile (ON DELETE CASCADE)
  - One-to-Many: Session (ON DELETE CASCADE)
  - One-to-Many: Account (ON DELETE CASCADE)
  - One-to-Many: Transaction (ON DELETE SET NULL)
  - One-to-Many: ProjectUser (ON DELETE CASCADE)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Unique: email
  - Index: email

#### CASCADE RULES:
  - DELETE: Cascades to profile, sessions, accounts, project_users; Sets NULL for transactions
  - UPDATE: Automatically updates related records' foreign keys

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
 GET    |  `/api/users`              |  List all users
 POST   |  `/api/users`              |  Create new user
 GET    |  `/api/users/<id>`         |  Get user by ID
 PUT    |  `/api/users/<id>`         |  Update user
 DELETE |  `/api/users/<id>`         |  Delete user
 GET    |  `/api/users/<id>/profile` |  Get user profile
 GET    |  `/api/users/<id>/projects` |  Get user projects

#### SCHEMA FIELDS:
  Required: email
  Optional: name, email_verified, image
  Auto: id, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - UserProfile: Each user has exactly one profile with extended information
  - Session: User can have multiple active sessions across devices
  - Account: User can have multiple OAuth provider accounts
  - Transaction: User can be sender or receiver in carbon credit transactions
  - ProjectUser: User can participate in multiple projects with different roles

#### BUSINESS LOGIC:
  - Email must be unique and valid format
  - Email verification status tracked separately
  - User deletion cascades to most related data except transactions (preserved for audit)
  - Soft delete recommended for compliance and audit trails

---

## TABLE: user_profiles
#### RELATIONSHIPS:
  - One-to-One: User (ON DELETE CASCADE)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Foreign Key: user_id -> users.id (ON DELETE CASCADE)
  - Unique: user_id, wallet_address
  - Index: user_id, wallet_address

#### CASCADE RULES:
  - DELETE: Automatically deleted when user is deleted
  - UPDATE: Not applicable (user_id immutable after creation)

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/user-profiles`           |  List all profiles
  POST   |  `/api/user-profiles`           |  Create profile
  GET    |  `/api/user-profiles/<id>`      |  Get profile by ID
  PUT    |  `/api/user-profiles/<id>`      |  Update profile
  DELETE |  `/api/user-profiles/<id>`      |  Delete profile
  GET    |  `/api/user-profiles/wallet/<address>` |  Lookup by wallet

#### SCHEMA FIELDS:
  Required: user_id
  Optional: role, wallet_address, organization, country, phone_number, bio
  Auto: id, total_credits_earned, total_credits_sold, total_credits_bought, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - User: Each user has exactly one profile. Profile cannot exist without user.

#### BUSINESS LOGIC:
  - Wallet address must be valid Ethereum address (0x... format)
  - Credit stats updated automatically via transaction service methods
  - Role determines system permissions (ADMIN, PROJECT_OWNER, USER, VERIFIER)
  - Wallet address enables blockchain integration for carbon credits
  - Phone number format validation required

---

## TABLE: sessions
#### RELATIONSHIPS:
  - Many-to-One: User (ON DELETE CASCADE)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Foreign Key: user_id -> users.id (ON DELETE CASCADE)
  - Unique: token
  - Index: user_id, token, expires_at

#### CASCADE RULES:
  - DELETE: Automatically deleted when user is deleted
  - UPDATE: Updates if user_id changes (rare)

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/sessions`            |  List all sessions (admin only)
  POST   |  `/api/sessions`            |  Create new session (login)
  GET    |  `/api/sessions/<id>`       |  Get session by ID
  DELETE |  `/api/sessions/<id>`       |  Delete session (logout)
  DELETE |  `/api/sessions/user/<user_id>` |  Revoke all user sessions

#### SCHEMA FIELDS:
  Required: user_id, token, expires_at
  Optional: ip_address, user_agent
  Auto: id, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - User: Each session belongs to one user; user can have multiple concurrent sessions

#### BUSINESS LOGIC:
  - Token must be cryptographically secure random string
  - Sessions auto-expire based on expires_at timestamp
  - IP address and user agent stored for security auditing
  - Better Auth compatible implementation
  - Expired sessions should be periodically cleaned up

---

## TABLE: accounts
#### RELATIONSHIPS:
  - Many-to-One: User (ON DELETE CASCADE)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Foreign Key: user_id -> users.id (ON DELETE CASCADE)
  - Unique: (provider_id, account_id) composite
  - Index: user_id, provider_id

#### CASCADE RULES:
  - DELETE: Automatically deleted when user is deleted
  - UPDATE: Updates if user_id changes

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/accounts`            |  List accounts (admin only)
  POST   |  `/api/accounts`            |  Link new provider account
  GET    |  `/api/accounts/<id>`       |  Get account by ID
  DELETE |  `/api/accounts/<id>`       |  Unlink provider account
  GET    |  `/api/accounts/user/<user_id>` |  Get user's linked accounts

#### SCHEMA FIELDS:
  Required: user_id, account_id, provider_id
  Optional: access_token, refresh_token, access_token_expires_at, refresh_token_expires_at, scope, id_token, password
  Auto: id, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - User: Each account links one OAuth provider to a user; user can have multiple providers

#### BUSINESS LOGIC:
  - OAuth tokens encrypted at rest
  - Token refresh handled automatically before expiration
  - Password field used for local authentication (hashed)
  - Better Auth compatible for OAuth2 flows
  - Provider_id identifies OAuth provider (google, github, etc.)
  - Account_id is the user's ID on the provider's system

---

## TABLE: verifications
#### RELATIONSHIPS:
  - None (standalone table)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Unique: (identifier, value) composite
  - Index: identifier, expires_at

#### CASCADE RULES:
  - DELETE: No cascade effects
  - UPDATE: No cascade effects

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  POST   |  `/api/verifications/send`  |  Send verification code
  POST   |  `/api/verifications/verify` |  Verify code
  DELETE |  `/api/verifications/<id>`  |  Delete verification

#### SCHEMA FIELDS:
  Required: identifier, value, expires_at
  Optional: None
  Auto: id, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - Standalone: Used for email verification, password reset, etc.

#### BUSINESS LOGIC:
  - Identifier is email or phone number
  - Value is verification code/token
  - Expires_at determines validity period
  - Better Auth compatible
  - Expired verifications should be cleaned up periodically
  - One-time use tokens (delete after successful verification)

---

## TABLE: projects
#### RELATIONSHIPS:
  - One-to-Many: ProjectUser (ON DELETE CASCADE)
  - One-to-Many: Transaction (ON DELETE SET NULL)
  - One-to-Many: Measurement (ON DELETE CASCADE)
  - One-to-Many: IoTDevice (ON DELETE CASCADE)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Unique: contract_address
  - Index: status, organization_name, project_type, state, district

#### CASCADE RULES:
  - DELETE: Cascades to project_users, measurements, iot_devices; Sets NULL for transactions
  - UPDATE: Updates related records

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/projects`            |  List all projects
  POST   |  `/api/projects`            |  Create new project
  GET    |  `/api/projects/<id>`       |  Get project by ID
  PUT    |  `/api/projects/<id>`       |  Update project
  DELETE |  `/api/projects/<id>`       |  Delete project
  GET    |  `/api/projects/<id>/users` |  Get project team
  GET    |  `/api/projects/<id>/devices` |  Get project IoT devices
  GET    |  `/api/projects/<id>/measurements` |  Get project measurements
  PUT    |  `/api/projects/<id>/status` |  Update project status

#### SCHEMA FIELDS:
  Required: organization_name, organization_type, contact_person, email, phone, project_name, project_description, project_type, state, district, village, total_area, estimated_credits_per_year
  Optional: registration_number, coordinates, has_legal_permits, has_survey_report, has_environmental_clearance, contract_address, token_id
  Auto: id, total_credits_generated, status, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - ProjectUser: Many-to-many relationship with users through join table
  - Transaction: Carbon credit transactions linked to projects
  - Measurement: Environmental data collected from project site
  - IoTDevice: Sensors and monitoring equipment at project site

#### BUSINESS LOGIC:
  - Organization type: NGO, PANCHAYAT, COMMUNITY, COMPANY
  - Project type determines carbon credit calculation methodology
  - Status workflow: PENDING -> APPROVED -> ACTIVE -> COMPLETED (or REJECTED)
  - Contract address links to blockchain smart contract
  - Coordinates stored as JSON for geolocation
  - Legal documents required for approval
  - Credits generated calculated from measurements and project type
  - Email and phone validation required

---

## TABLE: project_users
#### RELATIONSHIPS:
  - Many-to-One: Project (ON DELETE CASCADE)
  - Many-to-One: User (ON DELETE CASCADE)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Foreign Keys: project_id -> projects.id (ON DELETE CASCADE), user_id -> users.id (ON DELETE CASCADE)
  - Unique: (project_id, user_id) composite
  - Index: project_id, user_id, role

#### CASCADE RULES:
  - DELETE: Automatically deleted when project or user is deleted
  - UPDATE: Updates when foreign keys change

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/project-users`       |  List all project-user #### relationships
  POST   |  `/api/project-users`       |  Add user to project
  GET    |  `/api/project-users/<id>`  |  Get relationship by ID
  PUT    |  `/api/project-users/<id>`  |  Update user role
  DELETE |  `/api/project-users/<id>`  |  Remove user from project

#### SCHEMA FIELDS:
  Required: project_id, user_id
  Optional: role
  Auto: id, joined_at

#### RELATIONSHIP DETAILS:
  - Project: Links users to projects they participate in
  - User: Links projects to users with specific roles

#### BUSINESS LOGIC:
  - Role determines permissions: OWNER, MANAGER, CONTRIBUTOR, VIEWER
  - OWNER has full control, MANAGER can edit, CONTRIBUTOR can add data, VIEWER read-only
  - One user per project can have OWNER role
  - Prevents duplicate user assignments to same project
  - Joined_at tracks when user was added to project

---

## TABLE: carbon_credits
#### RELATIONSHIPS:
  - One-to-Many: Transaction (ON DELETE RESTRICT)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Unique: blockchain_tx_hash
  - Index: project_id, vintage, status, certification_id

#### CASCADE RULES:
  - DELETE: Restricted if transactions exist (audit trail preservation)
  - UPDATE: Updates related records

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/carbon-credits`      |  List all credits
  POST   |  `/api/carbon-credits`      |  Issue new credits
  GET    |  `/api/carbon-credits/<id>` |  Get credit by ID
  PUT    |  `/api/carbon-credits/<id>` |  Update credit status
  GET    |  `/api/carbon-credits/project/<project_id>` |  Get credits by project
  POST   |  `/api/carbon-credits/<id>/retire` |  Retire credits

#### SCHEMA FIELDS:
  Required: project_id, amount, vintage
  Optional: status, blockchain_tx_hash, minted_at, burned_at, certification_body, certification_id
  Auto: id, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - Transaction: Credits can be involved in multiple transactions (minting, transfers, retirement)

#### BUSINESS LOGIC:
  - Vintage represents year of carbon sequestration
  - Status: ACTIVE, SOLD, RETIRED, BURNED
  - Blockchain_tx_hash links to on-chain minting transaction
  - Certification validates credit authenticity
  - Amount in tons of CO2 equivalent
  - Credits cannot be deleted if involved in transactions
  - Retirement permanently removes credits from circulation

---

## TABLE: transactions
#### RELATIONSHIPS:
  - Many-to-One: User (from_user_id) (ON DELETE SET NULL)
  - Many-to-One: User (to_user_id) (ON DELETE SET NULL)
  - Many-to-One: Project (ON DELETE SET NULL)
  - Many-to-One: CarbonCredit (ON DELETE SET NULL)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Foreign Keys: from_user_id -> users.id, to_user_id -> users.id, project_id -> projects.id, credit_id -> carbon_credits.id (all ON DELETE SET NULL)
  - Unique: tx_hash
  - Index: from_user_id, to_user_id, project_id, credit_id, type, status, created_at

#### CASCADE RULES:
  - DELETE: Sets NULL for foreign keys (preserves transaction history)
  - UPDATE: Updates if foreign keys change

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/transactions`        |  List all transactions
  POST   |  `/api/transactions`        |  Create transaction
  GET    |  `/api/transactions/<id>`   |  Get transaction by ID
  PUT    |  `/api/transactions/<id>`   |  Update transaction status
  GET    |  `/api/transactions/user/<user_id>` |  Get user transactions
  GET    |  `/api/transactions/project/<project_id>` |  Get project transactions

#### SCHEMA FIELDS:
  Required: type, amount
  Optional: from_user_id, to_user_id, project_id, credit_id, price_per_credit, total_price, currency, tx_hash, block_number, gas_used, status, metadata
  Auto: id, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - User (from): Sender of credits or funds
  - User (to): Receiver of credits or funds (optional for MINT, BURN, RETIRE)
  - Project: Associated project for minting
  - CarbonCredit: Specific credit being transacted

#### BUSINESS LOGIC:
  - Type: MINT (create), TRANSFER (move), PURCHASE (buy), RETIRE (offset), BURN (destroy)
  - Status workflow: PENDING -> PROCESSING -> COMPLETED/FAILED
  - Price_per_credit and total_price for marketplace transactions
  - Tx_hash links to blockchain transaction
  - Gas_used tracks transaction costs
  - Metadata stores additional transaction details (JSON)
  - Currency defaults to ETH
  - User profile credit stats updated on completion

---

## TABLE: iot_devices
#### RELATIONSHIPS:
  - Many-to-One: Project (ON DELETE CASCADE)
  - One-to-Many: Measurement (ON DELETE CASCADE)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Foreign Key: project_id -> projects.id (ON DELETE CASCADE)
  - Unique: device_id
  - Index: project_id, device_id, status, type

#### CASCADE RULES:
  - DELETE: Automatically deleted when project is deleted; cascades to measurements
  - UPDATE: Updates related records

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/iot-devices`         |  List all devices
  POST   |  `/api/iot-devices`         |  Register new device
  GET    |  `/api/iot-devices/<id>`    |  Get device by ID
  PUT    |  `/api/iot-devices/<id>`    |  Update device
  DELETE |  `/api/iot-devices/<id>`    |  Remove device
  GET    |  `/api/iot-devices/<id>/measurements` |  Get device measurements
  POST   |  `/api/iot-devices/<id>/ping` |  Update device heartbeat

#### SCHEMA FIELDS:
  Required: device_id, name, type, project_id
  Optional: status, last_ping, metadata
  Auto: id, created_at, updated_at

#### RELATIONSHIP DETAILS:
  - Project: Each device is deployed at one project site
  - Measurement: Device collects multiple measurements over time

#### BUSINESS LOGIC:
  - Device_id must be globally unique identifier
  - Type: SENSOR, CAMERA, WEATHER_STATION
  - Status: ACTIVE, INACTIVE, MAINTENANCE, ERROR
  - Last_ping tracks device connectivity
  - Metadata stores device-specific configuration (JSON)
  - Offline detection based on last_ping threshold
  - Measurements used for carbon credit verification

---

## TABLE: measurements
#### RELATIONSHIPS:
  - Many-to-One: IoTDevice (ON DELETE CASCADE)
  - Many-to-One: Project (ON DELETE CASCADE)

#### CONSTRAINTS:
  - Primary Key: id (UUID)
  - Foreign Keys: device_id -> iot_devices.id (ON DELETE CASCADE), project_id -> projects.id (ON DELETE CASCADE)
  - Index: device_id, project_id, measurement_type, timestamp

#### CASCADE RULES:
  - DELETE: Automatically deleted when device or project is deleted
  - UPDATE: Updates if foreign keys change

 ENDPOINTS:
method  | url | Description 
------ | --- | ----------:
  GET    |  `/api/measurements`        |  List all measurements
  POST   |  `/api/measurements`        |  Record new measurement
  GET    |  `/api/measurements/<id>`   |  Get measurement by ID
  DELETE |  `/api/measurements/<id>`   |  Delete measurement
  GET    |  `/api/measurements/device/<device_id>` |  Get device measurements
  GET    |  `/api/measurements/project/<project_id>` |  Get project measurements
  GET    |  `/api/measurements/analytics` |  Get aggregated analytics

#### SCHEMA FIELDS:
  Required: device_id, project_id, measurement_type, value, unit
  Optional: timestamp, metadata
  Auto: id

#### RELATIONSHIP DETAILS:
  - IoTDevice: Each measurement comes from one device
  - Project: Measurements aggregated at project level for carbon calculations

#### BUSINESS LOGIC:
  - Measurement_type: TEMPERATURE, PH, SALINITY, TURBIDITY, DISSOLVED_OXYGEN, WATER_LEVEL, BIOMASS
  - Value is numeric reading
  - Unit specifies measurement unit (Celsius, pH, PSU, etc.)
  - Timestamp defaults to current time but can be backdated for batch uploads
  - Metadata stores additional context (JSON)
  - Used for carbon credit calculation and verification
  - Time-series data optimized for analytics queries
  - Anomaly detection for data quality

---

## ENUMS REFERENCE

### UserRole
- **ADMIN**: System administrator with full access
- **PROJECT_OWNER**: Can create and manage projects
- **USER**: Regular user, can view and participate
- **VERIFIER**: Can verify and approve projects

### ProjectType
- **MANGROVE**: Mangrove forest restoration
- **SEAGRASS**: Seagrass bed restoration
- **SALT_MARSH**: Salt marsh restoration
- **CORAL_REEF**: Coral reef restoration
- **KELP_FOREST**: Kelp forest cultivation

### ProjectStatus
- **PENDING**: Awaiting review
- **ACTIVE**: Currently operational
- **APPROVED**: Verified and approved
- **REJECTED**: Application rejected
- **COMPLETED**: Project finished

### ProjectRole
- **OWNER**: Full control over project
- **MANAGER**: Can edit project and manage team
- **CONTRIBUTOR**: Can add data and measurements
- **VIEWER**: Read-only access

### CreditStatus
- **ACTIVE**: Available for trading
- **SOLD**: Transferred to buyer
- **RETIRED**: Offset and removed from circulation
- **BURNED**: Permanently destroyed

### TransactionType
- **MINT**: Create new credits
- **TRANSFER**: Move between users
- **PURCHASE**: Buy from marketplace
- **RETIRE**: Offset carbon footprint
- **BURN**: Permanent destruction

### TransactionStatus
- **PENDING**: Initiated, awaiting processing
- **PROCESSING**: Being executed
- **COMPLETED**: Successfully finished
- **FAILED**: Transaction failed

### DeviceStatus
- **ACTIVE**: Operational and collecting data
- **INACTIVE**: Offline or disabled
- **MAINTENANCE**: Under maintenance
- **ERROR**: Malfunction detected

### DeviceType
- **SENSOR**: Environmental sensor
- **CAMERA**: Visual monitoring
- **WEATHER_STATION**: Meteorological data

### MeasurementType
- **TEMPERATURE**: Water/air temperature
- **PH**: Acidity level
- **SALINITY**: Salt concentration
- **TURBIDITY**: Water clarity
- **DISSOLVED_OXYGEN**: Oxygen in water
- **WATER_LEVEL**: Tide/water height
- **BIOMASS**: Vegetation density

### OrganizationType
- **NGO**: Non-governmental organization
- **PANCHAYAT**: Local government body
- **COMMUNITY**: Community group
- **COMPANY**: Private company