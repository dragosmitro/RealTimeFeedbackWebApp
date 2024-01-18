export const emojis = ["🔑", "🌵", "👍", "🤙"];
export const emojiNames = ["cheia", "cactus", "like", "chill"];

export function convertDate(dateObject) {
    const dateTime = new Date(dateObject);
    const localDateTime = new Date(dateTime.getTime());
    const date = localDateTime.getDate().toString().padStart(2, "0");
    const month = (localDateTime.getMonth() + 1).toString().padStart(2, "0");
    const year = localDateTime.getFullYear();
    const hours = localDateTime.getHours().toString().padStart(2, "0");
    const minutes = localDateTime.getMinutes().toString().padStart(2, "0");
    return `data: ${date}.${month}.${year}; ora: ${hours}:${minutes}`;
  }