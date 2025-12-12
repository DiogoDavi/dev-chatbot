const ws = new WebSocket("wss://didbot-server.onrender.com");

const chatBox = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function formatText(text) {
  const lines = text.split(/\r?\n/);

  const formattedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    if (/^\d+\.\s*/.test(trimmed)) {
      return `<br><br><strong>${trimmed.match(/^\d+\./)[0]}</strong> ${trimmed.replace(/^\d+\.\s*/, "")}`;
    }
    return trimmed;
  });

  return formattedLines.join("<br>");
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
