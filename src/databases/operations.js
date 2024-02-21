import { AdminModel, BukuModel, UserModel } from "./models.js";
import { AdminSeed, BookSeed, UserSeed } from "./seeders.js";
import { Conn } from "./config.js";
import mongoose from "mongoose";
import { BACKEND_HOST } from "../utils/server_env.js";

const insertCollection = async (model, seeder) => {
  try {
    await Conn();
    await model.insertMany(seeder);
    console.info("Inserting Success");
  } catch (err) {
    console.info(err.errmsg);
  } finally {
    mongoose.connection.close();
  }
};

const deleteCollection = async (model) => {
  try {
    await Conn();
    await model.deleteMany();
    console.log("Deleting Success");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
};

insertCollection(BukuModel, BookSeed);
// deleteCollection(UserModel);
