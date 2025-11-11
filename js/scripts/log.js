function adicionarLog(mensagem) {
  let logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(mensagem);
  localStorage.setItem("logs", JSON.stringify(logs));
  renderizarLog();
}

// Renderiza os logs no HTML
function renderizarLog() {
  let logs = JSON.parse(localStorage.getItem("logs")) || [];
  let lista = document.querySelector("#log-list");
  lista.innerHTML = "";

  let logsValidos = logs.filter(item => typeof item === "string");

  localStorage.setItem("logs", JSON.stringify(logsValidos));

  // Renderiza os logs válidos
  logsValidos.forEach((item, index) => {
    lista.innerHTML += `<li class="collection-item">
      ${index + 1} - ${item}
    </li>`;
  });
}

// // Limpa os logs
// function limparLog() {
//   localStorage.removeItem("logs");
//   renderizarLog();
// }

// Renderiza ao carregar a página
document.addEventListener("DOMContentLoaded", renderizarLog);