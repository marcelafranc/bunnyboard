const { ipcRenderer } = require("electron");

const USUARIO = "marcela";
const SENHA = "1234";

const btnLogin = document.getElementById("btnLogin");
const mensagemErro = document.getElementById("mensagem");

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