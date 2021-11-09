import vision from "@google-cloud/vision";
import config from "./config/env.js";

const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: config.vision.clientEmail,
    private_key: config.vision.privateKey,
  },
  projectId: config.vision.projectId,
});

export async function generateLabelsFromImage(filenameOrUrl) {
  try {
    const [result] = await client.labelDetection(filenameOrUrl);
    const labels = result.labelAnnotations;
    return labels;
  } catch (error) {
    throw error;
  }
}
