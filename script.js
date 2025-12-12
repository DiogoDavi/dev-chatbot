const ws = new WebSocket("wss://didbot-server.onrender.com");

const chatBox = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function formatText(text) {
  return text
    .replace(/(\d+\.)/g, "<br><br><strong>$1</strong>") 
    .replace(/\n/g, "<br>");
}

function addMessage(message, sender) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-message" : "bot-message";
  div.innerHTML = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  ws.send(text);
  input.value = "";
};

ws.onmessage = (event) => {
  const formatted = formatText(event.data);
  addMessage(formatted, "bot");
};

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
