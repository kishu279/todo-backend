# **Todo Backend**

A backend for a Todo application built with Node.js, Express, and MongoDB.

## **Schemas**

### **User Schema**

```javascript
{
  username: String,      // e.g., "xyz"
  email: String,         // e.g., "xyz@gmail.com"
  password: String       // e.g., "xyz123"
}
```

### **Todo Schema**

```javascript
{
  userid: { type: Schema.Types.ObjectId, ref: "User" },  // Reference to User
  title: String,                                        // e.g., "My Todo"
  isdone: Boolean,                                      // e.g., false
  desc: String,                                         // e.g., "Todo description"
  createDate: { type: Date, default: Date.now }         // Automatically set date
}
```

## **Routes**

### **User Routes**

| Route     | Method | Description              |
| --------- | ------ | ------------------------ |
| `/signin` | POST   | Sign in an existing user |
| `/signup` | POST   | Sign up a new user       |

### **Todo Routes**

| Route         | Method | Description             |
| ------------- | ------ | ----------------------- |
| `/addTodo`    | POST   | Add a new todo          |
| `/updateTodo` | PUT    | Update an existing todo |
| `/deleteTodo` | DELETE | Delete a todo           |

## **Middleware**

### **Authenticate**

- Ensures users are authenticated before accessing protected routes.

---

## **How to Run**

1. Clone the repository:
   ```bash
   git clone https://github.com/kishu279/todo-backend.git
   cd todo-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in `.env`:
   ```plaintext
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

Feel free to create a pull request if needed !!!
