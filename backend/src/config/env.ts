import dotenv from "dotenv";

dotenv.config();

const requiredEnvs = ["OPENAI_API_KEY", "JWT_SECRET"];

for (const key of requiredEnvs) {
  if (!process.env[key]) {
    throw new Error(`Missing env variable: ${key}`);
  }
}
