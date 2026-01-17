const ws = new WebSocket("wss://didbot-server.onrender.com");

const chat = document.getElementById("chat");
const input = document.getElementById("msg");

// Recebe mensagem do servidor
ws.onmessage = (event) => {
  adicionarMensagem(event.data, "bot");
};

// Enviar mensagem
function send() {
  const texto = input.value.trim();
  if (!texto) return;

  adicionarMensagem(texto, "user");
  ws.send(texto);

  input.value = "";
}

// Renderização correta (CSS compatível)
function adicionarMensagem(texto, tipo) {
  const msg = document.createElement("div");
  msg.className = `message ${tipo}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.innerText = tipo === "bot" ? "🤖" : "👤";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerText = texto;

  if (tipo === "bot") {
    msg.appendChild(avatar);
    msg.appendChild(bubble);
  } else {
    msg.appendChild(bubble);
    msg.appendChild(avatar);
  }

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// Limpar conversa
function limparConversa() {
  chat.innerHTML = "";
}
