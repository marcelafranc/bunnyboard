const fs = require("fs");
const path = require("path");
const { ipcRenderer } = require("electron");

ipcRenderer.on('caminho-do-arquivo', (event, filePath) => {

  const arquivo = filePath;
  console.log("Caminho do arquivo de dados:", arquivo);

  const textarea = document.getElementById("lousa");
  const btnLimpar = document.getElementById("btnLimpar");

  const minimizeBtn = document.getElementById("minimize-btn");
  const closeBtn = document.getElementById("close-btn");

  const modal = document.getElementById("modal-confirmacao");
  const btnConfirmar = document.getElementById("btnConfirmarLimpeza");
  const btnCancelar = document.getElementById("btnCancelarLimpeza");
  const btnVoltar = document.getElementById("backbtn");

  // Carrega o conteúdo salvo
  if (fs.existsSync(arquivo)) {
    textarea.value = fs.readFileSync(arquivo, "utf8");
  }

  // Salva automaticamente ao digitar
  let timer;
  textarea.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fs.writeFileSync(arquivo, textarea.value, "utf8");
    }, 500);
  });

  // Botão voltar
  btnVoltar.addEventListener("click", () => {
    ipcRenderer.send("voltar");
  });

  // Botão minimizar app
  minimizeBtn.addEventListener("click", () => {
    ipcRenderer.send("minimize-app");
  });

  // Botão fechar app
  closeBtn.addEventListener("click", () => {
    ipcRenderer.send("close-app");
  });

  // Botão limpar com confirmação
  btnLimpar.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // Botão de cancelar no modal
  btnCancelar.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Botão de confirmar no modal
  btnConfirmar.addEventListener("click", () => {
    textarea.value = "";
    fs.writeFileSync(arquivo, "", "utf8");
    modal.classList.add("hidden");
  });
});