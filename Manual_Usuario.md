# User Manual - Extreme Sudoku

## Table of Contents
1. [Registration](#registration)
2. [Login](#login)
3. [Playing Sudoku](#playing-sudoku)
4. [Logout](#logout)
5. [Additional Notes](#additional-notes)
6. [Setting Up the Development Environment](#setting-up-the-development-environment)
7. [Database Configuration](#database-configuration)
8. [Conclusion](#conclusion)

## Registration

1. **Access the Registration Page**:
   - On the homepage (`http://localhost:3000`), click the "Register" link.

2. **Fill Out the Registration Form**:
   - Enter a username in the "Username" field.
   - Enter a password in the "Password" field.

3. **Confirm Registration**:
   - Click the "Register" button to create your account.
   - If the username is already taken or there is an error, an error message will be displayed.

## Login

1. **Access the Login Page**:
   - On the homepage (`http://localhost:3000`), click the "Login" link.

2. **Fill Out the Login Form**:
   - Enter your username in the "Username" field.
   - Enter your password in the "Password" field.

3. **Confirm Login**:
   - Click the "Login" button to access your account.
   - If the credentials are incorrect, an error message will be displayed.

## Playing Sudoku

1. **Access the Sudoku Page**:
   - After logging in, click the "Play Sudoku" link on the homepage or go directly to `http://localhost:3000/sudoku`.

2. **Understanding the Sudoku Board**:
   - The Sudoku board consists of a 9x9 grid, divided into nine 3x3 boxes.
   - Some numbers will already be filled in (original cells) and cannot be changed.

3. **Filling the Board**:
   - Click on an empty cell to select it and enter a number from 1 to 9.
   - Press "Enter" after typing a number to validate the input.

4. **Real-time Validation**:
   - The board will be validated in real-time as you type.
   - If an invalid number is entered (repeated in the same row, column, or 3x3 box), the cell will be highlighted in red.

5. **Cell Highlights**:
   - The cells in the same row and column as the selected cell will be highlighted.
   - Cells with valid entries that have been changed by the user will be highlighted in a different color.

6. **Score and Errors**:
   - You must fill all the cells correctly to complete the board and receive a score.
   - If you make 5 errors, the game will end, and a message will be displayed.
   - After completing the board, a "Reset Board" button will appear, allowing you to start a new game while keeping the score.

## Logout

1. **Logout**:
   - To log out of your account, click the "Logout" button located on the Sudoku page.
   - You will be redirected to the homepage (`http://localhost:3000`).

## Additional Notes

- **Page Navigation**:
  - From the Login page, you can navigate to the Registration page by clicking the "Register" link and vice versa by clicking the "Login" link.

- **Error Messages**:
  - During registration and login, specific error messages will be displayed in case of issues such as an existing username or invalid credentials.

- **Game Interface**:
  - The game interface is user-friendly, with highlights for selected, invalid, and modified cells, providing an intuitive gaming experience.

## Setting Up the Development Environment

To start the development environment, you need to open two terminals:

1. **Terminal 1: Starting the Client (Frontend)**
   ```sh
   cd client
   npm start
    ```

2. **Terminal 2: Starting the Server (Backend)**
    ```
    cd server
    npm run dev
    ```

## Database Configuration

To configure the MySQL database, you need to set your password. Follow these steps:

1. Open the configuration file:

    - Navigate to the server/config directory and open the mysql.js file.

2. Replace the password:

    - Locate the line that contains:
    ```
    const sequelizeRaw = new 
    Sequelize('mysql://root:INSERT-HERE@localhost:3306', {             
    ```

    - Replace INSERT-HERE with your MySQL password.

    - Locate the line that contains:
    
    ```
    sequelize = new Sequelize('sudoku', 'root', 'INSERT-HERE', { 
    ```
    - Replace INSERT-HERE with your MySQL password.

3. Save the file:
    - After replacing the passwords, save the file.

## Conclusion
With this manual, you are ready to register, log in, and play Sudoku on Extreme Sudoku. Enjoy the game and good luck!


