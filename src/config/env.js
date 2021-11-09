import { resolve } from "path";
import dotenv from "dotenv";

const env = dotenv.config();

export default {
  basePath: resolve("src"),
  baseUrl: process.env.BASE_URL,
  vision: {
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
    projectId: process.env.PROJECT_ID,
  },
  bot: {
    token: process.env.BOT_TOKEN,
  },
};
