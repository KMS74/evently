import mongoose from "mongoose";

// global variable to store connection
let cached = (global as any).mongoose || {
  conn: null,
  promise: null,
};

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  // check if we have connection to our database
  if (cached.conn) {
    return cached.conn;
  }

  // check if we have connection string, otherwise throw error
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is missing");
  }

  // check if we have connection to our database and return it
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently", // database name
      bufferCommands: false, // disable mongoose buffering to avoid memory leak
    });

  // wait for connection to be established and return connection
  cached.conn = await cached.promise;
  return cached.conn;
};
