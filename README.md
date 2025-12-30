            API Documentation for Evangadi Forum

Authentication Middleware 
    Endpoint: /api/user/checkUser 
    Method: GET
    Description: Checks the current authenticated user's information.
    Request Headers
        Authorization: Bearer token
    Successful Response 
        Status Code: 200 OK
        Content-Type: application/json
            {
            "message": "Valid user", 
            "username": "Kebede",
            "userid":"123"
            }
    Error Responses
        Status Code: 401 Unauthorized
        Description: Authentication credentials were missing or incorrect.
        {
        "error": "Unauthorized",
        "message": "Authentication invalid"
        }

Sign-up
    Endpoint: /api/user/register
    Method: POST
    Description: Registers a new user.
    Request Body
        ●username (string): The username of the user.
        ●first_name (string): The first name of the user.
        ●last_name (string): The last name of the user.
        ●email (string): The email of the user.
        ●password (string): The password of the user.
    Successful Response 
        Status Code: 201 Created
        Content-Type: application/json
            {
            "message": "User registered successfully"
            }
    Error Responses
        Status Code: 400 Bad Request
        Description: Missing or invalid fields.
            {
            "error": "Bad Request",
            "message": "Please provide all required fields"
            }
        Status Code: 400 Bad Request
        Description: Missing or invalid fields.
            {
            "error": "Bad Request",
            "message": "Password must be at least 8 characters"
            }

        Status Code: 409 Conflict
        Description: A user with the provided username or email already exists.
            {
            "error": "Conflict",
            "message": "User already existed"
            }
        Status Code: 500 Internal Server Error
        Description:An unexpected error occurred.
            {
            "error": "Internal Server Error", "message": "An unexpected error occurred."
            }

Login

