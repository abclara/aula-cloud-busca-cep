function pegarCidades() {
  // Pega a sigla do estado selecionado
  uf = document.querySelector("#estado").value;

  // Seleciona o dropdown de cidades
  selectCidade = document.querySelector("#cidade");

  // Monta a URL da API do IBGE
  let urlCidade = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

  // Faz a requisição
  fetch(urlCidade)
    .then((res) => res.json())
    .then((cidades) => {
      console.log(cidades);

      // Cria a primeira opção como placeholder
      let cidadesList = '<option value="" disabled selected>Escolha uma Cidade</option>';

      // Adiciona cada cidade como opção
      for (let i = 0; i < cidades.length; i++) {
        cidadesList += `<option value="${cidades[i].nome}">${cidades[i].nome}</option>`;
      }

      // Atualiza o select com as opções
      selectCidade.innerHTML = cidadesList;
    });
}