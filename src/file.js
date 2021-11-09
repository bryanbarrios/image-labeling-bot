import { createWriteStream, mkdirSync, existsSync } from "fs";
import { get } from "https";
import fetch from "node-fetch";
import config from "./config/env.js";

export async function getFilePath(fileId) {
  const url = `${config.baseUrl}/bot${config.bot.token}/getFile?file_id=${fileId}`;
  const request = await fetch(url);
  const { result } = await request.json();

  return result.file_path;
}

export function getFile(filePath) {
  const url = `${config.baseUrl}/file/bot${config.bot.token}/${filePath}`;
  return url;
}

export function downloadFile(telegramFilePath) {
  const path = `${config.basePath}/temp`;

  createFolder(path);

  const downloadedFile = get(getFile(telegramFilePath), (response) =>
    response.pipe(createWriteStream(`${path}/image.jpg`))
  );

  return downloadedFile;
}

function createFolder(folderName) {
  if (!existsSync(folderName)) {
    mkdirSync(folderName);
  }
}
