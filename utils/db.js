import mongoose from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function db() {
  if (global.mongoose.conn) {
    console.log("Using existing MongoDB connection");
    return global.mongoose.conn;
  }

  const conString = process.env.MONGO_URL;

  try {
    global.mongoose.promise = mongoose.connect(conString, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    global.mongoose.conn = await global.mongoose.promise;
    console.log("New MongoDB connection established");
    return global.mongoose.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}
