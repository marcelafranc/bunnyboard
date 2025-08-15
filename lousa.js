const fs = require("fs");
const path = require("path");
const { ipcRenderer } = require("electron");

const arquivo = path.join(__dirname, "conteudo.txt");
const textarea = document.getElementById("lousa");
const btnLimpar = document.getElementById("btnLimpar");

const minimizeBtn = document.getElementById("minimize-btn");
const closeBtn = document.getElementById("close-btn");

const modal = document.getElementById("modal-confirmacao");
const btnConfirmar = document.getElementById("btnConfirmarLimpeza");
const btnCancelar = document.getElementById("btnCancelarLimpeza");
const btnVoltar = document.getElementById("backbtn");

// carrega o conteudo
if (fs.existsSync(arquivo)) {
  textarea.value = fs.readFileSync(arquivo, "utf8");
}

// salva automatico!
let timer;
textarea.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fs.writeFileSync(arquivo, textarea.value, "utf8");
  }, 500);
});

// botao voltar
btnVoltar.addEventListener("click", () => {
  ipcRenderer.send("voltar");
});

// botao minimizar app
minimizeBtn.addEventListener("click", () => {
  console.log("Botão MINIMIZAR clicado!");
  ipcRenderer.send("minimize-app");
});

// botao fechar app
closeBtn.addEventListener("click", () => {
  console.log("Botão FECHAR clicado!");
  ipcRenderer.send("close-app");
});

// botao limpar
btnLimpar.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// botao cancelar limpeza
btnCancelar.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// botao confirmar limpeza
btnConfirmar.addEventListener("click", () => {
  // substitui tudo
  textarea.value = "";
  fs.writeFileSync(arquivo, "", "utf8");
  modal.classList.add("hidden");
});
