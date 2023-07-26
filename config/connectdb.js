import mongoose from 'mongoose';

export const connectLoginRegisterDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "login_register",
    };

    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database 'login_register' Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export const connectRegisterDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "registers",
    };

    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database 'register' Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
export default{connectLoginRegisterDB, connectRegisterDB};