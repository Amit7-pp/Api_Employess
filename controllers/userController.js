// controllers/userController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel, UserModel1 } from "../models/User.js";



export const userRegistration = async (req, res) => {
  try {
    const { name, email, password, password_confirmation, tc } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.send({ status: "failed", message: "User is already registered" });
    }

    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
          name: name,
          email: email,
          password: hashPassword,
          tc: tc,
        });
        await newUser.save();
        return res.status(201).send({
          status: "Success",
          message: "User Registered Successfully",
        });
      } else {
        return res.send({
          status: "failed",
          message: "Password And Confirm Password Does Not Match",
        });
      }
    } else {
      return res.send({
        status: "failed",
        message: "All fields are required",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "Unable to register",
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await UserModel.findOne({ email: email });
      if (user !== null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          const token = jwt.sign({ userId: user._id }, "your-secret-key");
          return res.send({ status: "Success", message: "Login Success", token: token });
        } else {
          return res.send({ status: "Failed", message: "Email or Password is not valid" });
        }
      } else {
        return res.send({ status: "Failed", message: "You are not a registered user" });
      }
    } else {
      return res.send({ status: "failed", message: "All Fields Are Required" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", message: "Unable to login" });
  }
};



let lastCustomId = 0; // Variable to keep track of the last used custom ID

export const employeeRegistration = async (req, res) => {
  try {
    
    const { firstName, lastName, bob, gender, mobile, email, photo, location, Govt_idno, govt_id } = req.body;
    
    const register = await UserModel1.findOne({ email: email });
    if (register) {
      return res.send({ status: "failed", message: "Employee is already registered" });
    }

    // Increment the last custom ID and use it for the new employee
    lastCustomId++;
    const newEmployee = new UserModel1({
      customId: lastCustomId.toString(), // Convert the custom ID to string
      firstName: firstName,
      lastName: lastName,
      bob: bob,
      gender: gender,
      email: email,
      mobile: mobile,
      photo: photo,
      location: location,
      Govt_idno: Govt_idno,
      govt_id: govt_id,
    });
    await newEmployee.save();

    return res.status(201).send({
      status: "Success",
      message: "Employee Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "Unable to register",
    });
  }
};


export const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await UserModel1.find();
    return res.status(200).json(allEmployees);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "Unable to fetch employees",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Check if the employee exists
    const existingEmployee = await UserModel1.findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete the employee from the database
    await UserModel1.findByIdAndDelete(employeeId);

    return res.status(200).json({ message: "Employee deleted successfully", deletedEmployee: existingEmployee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to delete employee" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { firstName, lastName, bob, gender, mobile, email, photo, location, Govt_idno, govt_id } = req.body;

    const updatedEmployee = await UserModel1.findByIdAndUpdate(
      employeeId,
      {
        firstName: firstName,
        lastName: lastName,
        bob: bob,
        gender: gender,
        email: email,
        mobile: mobile,
        photo: photo,
        location: location,
        Govt_idno: Govt_idno,
        govt_id: govt_id,
      },
      { new: true } // To get the updated document as the result
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to update employee" });
  }
};
export const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await UserModel1.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Unable to fetch employee details' });
  }
};


// Route to fetch all email addresses of employees
export const getAllEmails = async (req, res) => {
  try {
    const allEmails = await UserModel1.find({}, 'email'); // Retrieve only the 'email' field
    const emails = allEmails.map(employee => employee.email);
    return res.status(200).json(emails);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "Unable to fetch email addresses",
    });
  }
};




   

