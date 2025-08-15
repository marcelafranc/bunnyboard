const fs = require("fs");
const path = require("path");

const arquivo = path.join(__dirname, "conteudo.txt");
const textarea = document.getElementById("lousa");
const btnLimpar = document.getElementById("btnLimpar");

const modal = document.getElementById("modal-confirmacao");
const btnConfirmar = document.getElementById("btnConfirmarLimpeza");
const btnCancelar = document.getElementById("btnCancelarLimpeza");

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
// Botão principal para limpar abre o modal
btnLimpar.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Botão de cancelar no modal
btnCancelar.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Botão de confirmar no modal
btnConfirmar.addEventListener("click", () => {
  // Executa a limpeza
  textarea.value = "";
  fs.writeFileSync(arquivo, "", "utf8");
  // Esconde o modal
  modal.classList.add("hidden");
});
