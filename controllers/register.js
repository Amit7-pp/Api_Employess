import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const employeeRegistration = async (req, res) => {
  const { firstName, lastName,bob,gender,mobile,email,photo,location,Govt_idno,govt_id  } = req.body;
  const register = await UserModel.findOne({ email: email });
  if (register) {
    res.send({ status: "failed", message: "User is already registered" });
  } else {
    if (firstName&&lastName&&bob&&gender&&mobile&&email&&Photo && location&&Govt_idno&&govt_id) {
        try {
          const salt = await bcrypt.genSalt(10);
        
          const doc = new UserModel1({
            
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
          await doc.save();
          res.status(201).send({
            status: "Success",
            message: "User Registered Successfully",
          });
        } catch (error) {
          console.log(error);
          res.send({
            status: "failed",
            message: "Unable to register",
          });
        }
     
    } else {
      res.send({
        status: "failed",
        message: "All fields are required",
      });
    }
  }
};
