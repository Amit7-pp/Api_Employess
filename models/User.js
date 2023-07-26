
import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  tc: { type: Boolean, required: true },
});
const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { _id: false } // Disable automatic generation of _id for attendance objects
);

const registerSchema = new mongoose.Schema({
  customId: { type: String, required: true, unique: true }, // Custom employee ID
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
   bob: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
   email: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  photo: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
   Govt_idno: { type: String, required: true, trim: true },
  govt_id: { type: String, required: true, trim: true },
  attendance: [attendanceSchema],

});

// Model
const UserModel = mongoose.model("user_login_register", userSchema);
const UserModel1 = mongoose.model("Register", registerSchema,);
export { UserModel, UserModel1 };
