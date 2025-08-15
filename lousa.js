const fs = require("fs");
const path = require("path");
const { ipcRenderer } = require("electron");

const arquivo = path.join(__dirname, "conteudo.txt");
const textarea = document.getElementById("lousa");
const btnLimpar = document.getElementById("btnLimpar");

// Carrega o conteúdo salvo, se existir
if (fs.existsSync(arquivo)) {
  textarea.value = fs.readFileSync(arquivo, "utf8");
}

// Salva automaticamente ao digitar, com debounce de 500ms para evitar muitos writes
let timer;
textarea.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fs.writeFileSync(arquivo, textarea.value, "utf8");
  }, 500);
});

// Botão limpar com confirmação
btnLimpar.addEventListener("click", () => {
  ipcRenderer.send("mostrar-dialogo-confirmacao");
});

// resposta
ipcRenderer.on("limpeza-confirmada", () => {
  textarea.value = "";
  fs.writeFileSync(arquivo, "", "utf8");
});
