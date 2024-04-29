import fs from "fs";
import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

config();
const API_KEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY ?? "");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = "what kind of projects can I use Gemini?";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  fs.writeFile("suggestions.txt", text, (err) => {
    if (err) {
      return;
    }
  });
}

run();
