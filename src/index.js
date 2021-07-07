import cheerio from "cheerio";
import notifier from "node-notifier";
import dotenv from "dotenv";

import { fetchPage, getFirstNumberFromString } from "./utils";

dotenv.config();

const myAge = process.env.MY_AGE;

const getCurrentAge = async () => {
  try {
    const html = await fetchPage(
      "https://covid19.min-saude.pt/pedido-de-agendamento/"
    );

    const $ = cheerio.load(html);
    const cssSelector = "div#pedido_content > h3.has-text-color > strong";

    // Tem <age> ou mais anos e ainda não foi vacinado(a)?
    const heading = $(cssSelector).text();

    const currentAge = getFirstNumberFromString(heading);

    return currentAge;
  } catch (error) {
    throw error;
  }
};

const app = async () => {
  const currentAge = await getCurrentAge();

  if (currentAge > myAge) {
    console.log("Keep waiting... 😭");

    return;
  }

  notifier.notify({
    title: "Yay!!! 🎉🎉🎉",
    message: "You can finally schedule your vaccine!",
    wait: true,
  });

  process.exit();
};

const runApp = () => {
  setInterval(async () => {
    await app();
  }, 5000);
};

runApp();
