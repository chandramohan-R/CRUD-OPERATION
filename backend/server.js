const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db'); 


const app = express();
const PORT = 5000;


// Task schema
const taskSchema = new mongoose.Schema({
  name: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

app.use(bodyParser.json());
app.use(cors());
connectDB();

// CRUD operations
// Define Employee Schema
// Define Mongoose Schemas
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Define Mongoose Models
const Employee = mongoose.model('Employee', employeeSchema);
const Department = mongoose.model('Department', departmentSchema);
const Role = mongoose.model('Role', roleSchema);

// Routes
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/employees', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    department: req.body.department,
    role: req.body.role,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create a task
app.post('/api/tasks', async (req, res) => {
  try {
    const { name, status } = req.body;
    const task = new Task({ name, status });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
