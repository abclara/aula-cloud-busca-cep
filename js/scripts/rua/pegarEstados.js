function pegarEstados() {
  // Seleciona o dropdown de estados
  selectEstado = document.querySelector("#estado");

  // URL da API do IBGE
  let urlEstado = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  // Requisição para obter os estados
  fetch(urlEstado)
    .then((res) => res.json())
    .then((estados) => {
      console.log(estados);

      // Cria a opção inicial
      let estadosList = '<option value="" disabled selected>Escolha um Estado</option>';

      // Adiciona os estados ao select
      for (let i = 0; i < estados.length; i++) {
        estadosList += `<option value="${estados[i].sigla}">${estados[i].nome}</option>`;
      }

      // Atualiza o dropdown
      selectEstado.innerHTML = estadosList;
    });
}

// Executa ao carregar o script
pegarEstados();
window.pegarEstados = pegarEstados;