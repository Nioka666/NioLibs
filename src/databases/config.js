/* eslint-disable no-undef */
// koneksi ke mongodb
import mongoose from "mongoose";
import { DB_PASS } from "../utils/server_env.js";
import chalk from "chalk";

export const Conn = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://nioka:${DB_PASS}@niolibs.ioifwrm.mongodb.net/NioLibs`
    );

    console.log(chalk.green.bold("Connected to MongoDB Atlas ✅"));
  } catch (err) {
    console.error(`Error connecting to MongoDB Atlas: ${err.message}`);
    throw err;
  }
};
