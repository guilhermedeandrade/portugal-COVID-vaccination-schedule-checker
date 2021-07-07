import fetch from "node-fetch";

export default async function fetchPage(url) {
  const response = await fetch(url);
  const html = await response.text();

  return html;
}
