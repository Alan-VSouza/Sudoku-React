# Extreme Sudoku API Documentation

## Table of Contents
- [Frontend](#frontend)
- [Backend](#backend)
- [Authentication](#authentication)
- [Sudoku Game](#sudoku-game)
- [Notes](#notes)
- [Client Authentication State](#client-authentication-state)

## Frontend
The frontend is the user interface where you interact with the Sudoku game. It is built using React and can be accessed via the following URL:

### Frontend URL
- **URL:** `http://localhost:3000/sudoku`
  - This URL loads the Sudoku game interface where you can play and interact with the game.

### Frontend Pages

#### Home Page
- **Path:** `/`
- **Description:** Landing page with navigation options for Login, Registration, and playing Sudoku.
- **Components:** `Home.js`
- **Styles:** `Home.css`

#### Login Page
- **Path:** `/login`
- **Description:** Page where users can log in with their username and password.
- **Components:** `Login.js`
- **Styles:** `Login.css`
- **Additional Features:** Displays error messages when credentials are invalid and provides navigation to the registration page.

#### Register Page
- **Path:** `/register`
- **Description:** Page where new users can sign up by creating a username and password.
- **Components:** `Register.js`
- **Styles:** `Register.css`
- **Additional Features:** Displays error messages for registration issues and provides navigation to the login page.

#### Sudoku Page
- **Path:** `/sudoku`
- **Description:** Main page for the Sudoku game where authenticated users can play.
- **Components:** `Sudoku.js`, `SudokuGrid.js`
- **Styles:** `Sudoku.css`, `SudokuGrid.css`
- **Additional Features:** Real-time validation of user inputs, highlighting invalid cells, and displaying error messages and scores.

### Visual Changes According to the Game
- **Original Cells:** Displayed in a different color and are read-only.
- **Invalid Cells:** Highlighted in red when invalid input is detected.
- **Modified Cells:** Highlighted in a specific color to indicate the value was changed by the user.
- **Cell Highlighting:** When a cell is focused, all cells in the same row and column are highlighted.

## Backend
The backend provides the data and handles business logic such as user authentication and Sudoku board validation. The frontend makes HTTP requests to the backend to fetch data and perform actions. The backend is built using Node.js and Express.

### API Endpoints

#### Authentication

##### POST /api/auth/register
Registers a new user.

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Headers:** None
- **Request Body Parameters:**
  - `username` (string) - Username.
  - `password` (string) - Password.
- **Responses:**
  - **201:** User successfully registered.
    ```json
    {
      "message": "User registered"
    }
    ```
  - **400:** Request error (e.g., user already exists).
    ```json
    {
      "error": "Error message"
    }
    ```

##### POST /api/auth/login
Authenticates a user and returns a JWT token.

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Headers:** None
- **Request Body Parameters:**
  - `username` (string) - Username.
  - `password` (string) - Password.
- **Responses:**
  - **200:** JWT token.
    ```json
    {
      "token": "JWT token"
    }
    ```
  - **401:** Invalid credentials.
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### Sudoku Game

#### GET /api/sudoku/puzzle
Returns an initial Sudoku board.

- **URL:** `/api/sudoku/puzzle`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: `Bearer {token}`
- **Request Parameters:** None
- **Responses:**
  - **200:** Sudoku board.
    ```json
    {
      "board": [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ]
    }
    ```

#### POST /api/sudoku/validate
Validates the current Sudoku board in real-time as the user enters values.

- **URL:** `/api/sudoku/validate`
- **Method:** `POST`
- **Headers:**
  - `Authorization`: `Bearer {token}`
- **Request Body Parameters:**
  - `board` (array) - Sudoku board.
    ```json
    {
      "board": [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
      ]
    }
    ```
- **Responses:**
  - **200:** Validation result.
    - If the board is valid:
      ```json
      {
        "valid": true
      }
      ```
    - If the board is invalid:
      ```json
      {
        "valid": false,
        "invalidCells": [
          [0, 2],
          [1, 1]
        ]
      }
      ```

### Notes

- **JWT Authentication**:
  - All protected endpoints require the `Authorization` header with the JWT token.
  - The header format is `Authorization: Bearer {token}`.

- **Real-time Validation**:
  - The Sudoku board is validated continuously as the user types, sending the current board state to the `/api/sudoku/validate` endpoint.

- **Game Route**:
  - The Sudoku game is accessible at the path `http://localhost:3000/sudoku`.

## Client Authentication State

- The client manages the authentication state using the React Context API.
- `AuthContext` is used to provide `login` and `logout` functions, as well as the authentication state (`authState`).
- **Login**: Stores the JWT token in `localStorage` and updates the authentication state.
- **Logout**: Removes the JWT token from `localStorage` and updates the authentication state.
