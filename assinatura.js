const canvas = document.getElementById("assinatura");
const ctx = canvas.getContext("2d");

let desenhando = false;

function iniciar(e) {
  desenhando = true;
  ctx.beginPath();
  ctx.moveTo(posX(e), posY(e));
}

function desenhar(e) {
  if (!desenhando) return;
  ctx.lineTo(posX(e), posY(e));
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.stroke();
}

function parar() {
  desenhando = false;
}

function posX(e) {
  return e.touches
    ? e.touches[0].clientX - canvas.getBoundingClientRect().left
    : e.offsetX;
}

function posY(e) {
  return e.touches
    ? e.touches[0].clientY - canvas.getBoundingClientRect().top
    : e.offsetY;
}

canvas.addEventListener("mousedown", iniciar);
canvas.addEventListener("mousemove", desenhar);
canvas.addEventListener("mouseup", parar);
canvas.addEventListener("mouseleave", parar);

canvas.addEventListener("touchstart", iniciar);
canvas.addEventListener("touchmove", desenhar);
canvas.addEventListener("touchend", parar);

document.getElementById("limpar").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
