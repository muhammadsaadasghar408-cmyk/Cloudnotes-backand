const mongoose= require('mongoose');
const mongoURI="mongodb://localhost:27017/CloudnotesDB";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToMongo;