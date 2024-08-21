import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");
export const isENV = dotenv.config({ path: envPath }).parsed;

export const CLIENT_PORT = isENV.VITE_CLIENT_PORT;
export const CLIENT_HOST = isENV.VITE_CLIENT_SERVER_HOST;

export const BACKEND_PORT = isENV.VITE_BACKEND_SERVER_PORT;
export const BACKEND_HOST = isENV.VITE_BACKEND_SERVER_HOST;

export const DB_USERNAME = isENV.VITE_DB_USERNAME;
export const DB_PASS = isENV.VITE_DB_PASSWORD;
