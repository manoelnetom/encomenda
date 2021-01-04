export function capitalize(str) {
  if (typeof str !== "string") {
    return "";
  }
  const word = str.toLowerCase();
  return word.charAt(0).toUpperCase() + word.substr(1);
}

export function localFormatDate(date) {
  const data = new Date(date);
  const options = { day: "numeric", month: "long", year: "numeric" };

  return data.toLocaleDateString("pt-br", options);
}
