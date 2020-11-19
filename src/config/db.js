import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`banco conectado ${conn.connection.host}`);
  } catch (err) {
    console.error(`erro: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
