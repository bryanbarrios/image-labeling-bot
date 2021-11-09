import { Telegraf } from "telegraf";
import { generateLabelsFromImage } from "./vision.js";
import { getFilePath, downloadFile } from "./file.js";
import config from "./config/env.js";

export default async () => {
  const bot = new Telegraf(config.bot.token);

  bot.start(async (context) => {
    await context.reply("¡Hola 🤖!");
    await context.reply("¡Bienvenido al etiquetador de imágenes 🏞🤙🏼!");
    await context.reply(
      "ℹ️ Para comenzar, envía una imagen para recibir las etiquetas generadas."
    );
  });
  bot.help((context) =>
    context.reply(
      "📌 Si presenta un problema o tiene alguna duda, regístrela en https://github.com/bryanbarrios/image-labeling-bot/issues y con gusto estaremos revisando."
    )
  );
  bot.on("sticker", (context) =>
    context.reply("‼️ Únicamente puedes obtener las etiquetas de una imagen.")
  );
  bot.on("photo", async (context) => {
    let fileId;

    for (const photo of context.message.photo) fileId = photo.file_id;

    const telegramFilePath = await getFilePath(fileId);

    downloadFile(telegramFilePath).on("close", async () => {
      context.reply("⌛️ Generando etiquetas. Espere un momento.");

      const labels = await generateLabelsFromImage(
        `${config.basePath}/temp/image.jpg`
      );
      const response = labels
        .map(
          ({ description, score }) =>
            `*Etiqueta:* ${description} - *Puntaje:* ${score.toFixed(2)}`
        )
        .join("\n");

      context.replyWithMarkdown(response);
    });
  });
  bot.launch();
};
