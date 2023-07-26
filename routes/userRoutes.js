import express from "express";
const router = express.Router();
import {
  userRegistration,
  userLogin,
  employeeRegistration,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
  getEmployeeById,
  getAllEmails,
  
  // handleDateSelect
} from "../controllers/userController.js";

// Public Routes
router.post("/register", userRegistration);
router.post("/login", userLogin);
router.post("/Addemployee", employeeRegistration);

// GET route to fetch all employees
router.get("/employees", getAllEmployees);

// DELETE route to delete an employee
router.delete("/employee/:id", deleteEmployee);

// PUT route to update an employee
router.put("/employee/:id", updateEmployee);

// Get a single employee by ID route
router.get('/employee/:id', getEmployeeById);
router.get("/emails", getAllEmails);
// router.post("/atendance",handleDateSelect)

// Protected Routes

export default router;
