const { ipcRenderer } = require("electron");

const USUARIO = "marcela";
const SENHA = "123";

const btnLogin = document.getElementById("btnLogin");
const mensagemErro = document.getElementById("mensagem");

const minimizeBtn = document.getElementById("minimize-btn");
const closeBtn = document.getElementById("close-btn");

console.log("Botão de minimizar encontrado:", minimizeBtn);
console.log("Botão de fechar encontrado:", closeBtn);

let erroTimer; // timer da mensagem

btnLogin.addEventListener("click", () => {

  const usuario = document.getElementById("username").value;
  const senha = document.getElementById("password").value;
  console.log("Usuário:", usuario);
  console.log("Senha:", senha);

  if (usuario === USUARIO && senha === SENHA) {
    ipcRenderer.send("login-sucesso");
  } else {
    // limpa o timer 
    clearTimeout(erroTimer);

    // mensagem de erro
    mensagemErro.innerText = "Usuário ou senha inválidos!";
    mensagemErro.style.visibility = "visible"; // mostra a mensagem

    // inicia o timer
    erroTimer = setTimeout(() => {
      mensagemErro.style.visibility = "hidden";
    }, 3000);
  }
  
});

// minimizar app
minimizeBtn.addEventListener("click", () => {
  console.log("Botão MINIMIZAR clicado!");
  ipcRenderer.send("minimize-app");
});

// fechar app
closeBtn.addEventListener("click", () => {
  console.log("Botão FECHAR clicado!");
  ipcRenderer.send("close-app");
});