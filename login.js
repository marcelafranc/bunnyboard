const { ipcRenderer } = require("electron");

const USUARIO = "marcela";
const SENHA = "1234";

document.getElementById("btnLogin").addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  console.log("Usuário digitado:", usuario);
  console.log("Senha digitada:", senha);

  if (usuario === USUARIO && senha === SENHA) {
    ipcRenderer.send("login-sucesso");
  } else {
    alert("Usuário ou senha inválidos!");
  }
});
