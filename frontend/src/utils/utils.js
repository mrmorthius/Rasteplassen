export function changeUTF(content) {
  if (!content) {
    return content;
  }

  return content.replace(/Ã¸/g, "ø").replace(/Ã¦/g, "æ").replace(/Ã¥/g, "å");
}
