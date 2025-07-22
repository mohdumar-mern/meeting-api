import fetch from 'node-fetch'; 

const SELF_URL = process.env.SELF_URL || "http://localhost:8080";

export const keepAlive = async () => {
setInterval(() => {
  fetch(SELF_URL)
    .then((res) => console.log("Self-ping:", res.status))
    .catch((err) => console.error("Self-ping error:", err));
}, 1000 * 60* 9);
}