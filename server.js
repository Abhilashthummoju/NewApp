const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
// Connect to MongoDB
// Define routes and middleware
mongoose.connect('mongodb+srv://abhilash:abhilash14@cluster0.ozj2kul.mongodb.net/').then(() => {
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename for the uploaded image
    }
  });
  
  // Initialize multer upload middleware
  const upload = multer({ storage: storage });
// schemas
const users = new mongoose.Schema({
    email: String,
    password: String,
    name: String
  });
const USER = mongoose.model('USERS', users);
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    Designation: { type: String, required: true },
    Gender: { type: String, enum: ['Male', 'Female'], required: true },
    Courses: { type: Array, required: true },
    img: { type: String }
});

const EMPLOYEE = mongoose.model('EMPLOYEE', EmployeeSchema);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
  });  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("body",email);
    try {
      // Find a user with the provided email and password
      const user = await USER.findOne({ email, password, });
  
      if (user) {
        res.json({ message: 'Login successful',data: user });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log("body signup",email);
      const newUser = await USER.create({ name, email, password });
      console.log("user created successfully",newUser);
      res.status(201).json({ message: 'Signup successful', user: newUser });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/createEmployee', upload.single('img'), async (req, res) => {
    try {
      // Extract necessary fields from request body
      const { name, email, mobile, Designation, Gender, Courses } = req.body;
      const img = req.file ? req.file.path : null; // Get image path if uploaded, otherwise set to null
  
      // Create a new employee record in the database
      const newEmployee = await EMPLOYEE.create({ name, email, mobile, Designation, Gender, Courses, img });
  
      // Send success response with the created employee data
      res.status(201).json({ message: 'Employee record created successfully', employee: newEmployee });
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/editEmployee/:id', async (req, res) => {
    try {
      const employeeId = req.params.id; // Get employee ID from URL path
      const { name, email, mobile, Designation, Gender, Course, img } = req.body; // Extract updated details from request body
  
      // Find the employee by ID and update their details
      const updatedEmployee = await EMPLOYEE.findByIdAndUpdate(employeeId, {
        name,
        email,
        mobile,
        Designation,
        Gender,
        Courses,
        img
      }, { new: true }); // Set { new: true } to return the updated document
  
      if (!updatedEmployee) {
        // If no employee with the specified ID is found, return a 404 Not Found response
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Send success response with the updated employee data
      res.json({ message: 'Employee details updated successfully', employee: updatedEmployee });
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.get('/employees', async (req, res) => {
    try {
        // Fetch all employees from the database
        const employees = await EMPLOYEE.find();
        console.log("REQUEST CAME FOR EMPLOYEES",employees)

        
        // Send the list of employees as a JSON response
        res.json(employees);
    } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

  
  