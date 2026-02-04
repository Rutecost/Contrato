const canvas = document.getElementById("assinatura");
const ctx = canvas.getContext("2d");

let desenhando = false;
let temAssinatura = false;

// Ajuste de estilo da caneta
ctx.strokeStyle = "#1f2933";
ctx.lineWidth = 2;
ctx.lineCap = "round";

// Funções auxiliares
function getPosicao(event) {
  const rect = canvas.getBoundingClientRect();
  const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
  const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;
  return { x, y };
}

function iniciarDesenho(event) {
  desenhando = true;
  temAssinatura = true;
  const pos = getPosicao(event);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function desenhar(event) {
  if (!desenhando) return;
  event.preventDefault();
  const pos = getPosicao(event);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function finalizarDesenho() {
  desenhando = false;
  ctx.closePath();
}

// Eventos mouse
canvas.addEventListener("mousedown", iniciarDesenho);
canvas.addEventListener("mousemove", desenhar);
canvas.addEventListener("mouseup", finalizarDesenho);
canvas.addEventListener("mouseleave", finalizarDesenho);

// Eventos touch
canvas.addEventListener("touchstart", iniciarDesenho);
canvas.addEventListener("touchmove", desenhar);
canvas.addEventListener("touchend", finalizarDesenho);

// Limpar assinatura
document.getElementById("limpar").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  temAssinatura = false;
});

// Validação do formulário
document.getElementById("formContrato").addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const data = document.getElementById("dataNascimento").value;
  const aceite = document.getElementById("aceite").checked;

  if (!nome || !data) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (!temAssinatura) {
    alert("A assinatura manuscrita é obrigatória para validar o contrato.");
    return;
  }

  if (!aceite) {
    alert("É necessário aceitar os termos do contrato.");
    return;
  }

  // Exibir tela de sucesso
  document.querySelector(".contrato").style.display = "none";
  document.getElementById("sucesso").style.display = "flex";
});
