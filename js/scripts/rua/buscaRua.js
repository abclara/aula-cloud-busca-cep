function buscaRua() {
  // Mostra o spinner de carregamento
  $(".preloader-wrapper").show();

  // Captura os valores dos campos
  estado = document.querySelector("#estado").value;
  cidade = document.querySelector("#cidade").value;
  rua = document.querySelector("#rua").value;

  // Monta a URL da API ViaCEP
  url = `https://viacep.com.br/ws/${estado}/${cidade}/${rua}/json/`;
  console.log("url montada", url);

  // Faz a requisição
  fetch(url)
    .then((res) => res.json())
    .then((ruas) => {
      console.log(ruas);
      let listaRuas = document.querySelector("#lista-ruas");

      // Se não houver resultados
      if (!ruas || ruas.length === 0) {
        salvarLog('RUA', { estado, cidade, rua }, 'Nenhum resultado encontrado', 'erro', url);
        listaRuas.innerHTML = '<div class="card-panel red lighten-4"><p>Nenhum resultado encontrado.</p></div>';
        $(".preloader-wrapper").hide();
        return;
      }

      // Monta a lista de resultados
      let ruasList = "";
      for (let i = 0; i < ruas.length; i++) {
        ruasList += `<ul class="collection">
          <li class="collection-item">RUA: <span id="dadoRua">${ruas[i].logradouro}</span></li>
          <li class="collection-item">BAIRRO: <span id="dadoBairro">${ruas[i].bairro}</span></li>
          <li class="collection-item">CIDADE: <span id="dadoCidade">${ruas[i].localidade}</span></li>
          <li class="collection-item">ESTADO: <span id="dadoEstado">${ruas[i].estado}</span></li>
        </ul>`;
      }

      // Exibe os resultados após um pequeno delay
      setTimeout(() => {
        listaRuas.innerHTML = ruasList;
        $(".preloader-wrapper").hide();
        salvarLog('RUA', { estado, cidade, rua }, { quantidade: ruas.length }, 'sucesso', url);
      }, 2000);
    })
    .catch((error) => {
      console.error('Erro na consulta:', error);
      salvarLog('RUA', { estado, cidade, rua }, 'Erro na consulta: ' + error.message, 'erro', url);
      let listaRuas = document.querySelector("#lista-ruas");
      listaRuas.innerHTML = '<div class="card-panel red lighten-4"><p>Erro ao buscar rua. Verifique sua conexão.</p></div>';
      $(".preloader-wrapper").hide();
    });
}