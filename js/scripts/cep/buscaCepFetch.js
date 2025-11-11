async function buscaCepFetch() {
  // Pega o CEP digitado
  let cep = document.querySelector("input").value;
  console.log("buscando cep", cep);

  // Monta a URL da API ViaCEP
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  // Requisição com Fetch
  fetch(url)
    .then((res) => {
      console.log('resposta aqui', res);
      return res.json();
    })
    .then((dados) => {
      console.log(dados.logradouro);

      // Se o CEP não for encontrado
      if (dados.erro) {
        salvarLog('CEP', { cep }, 'CEP não encontrado', 'erro', url);
        alert('CEP não encontrado!');
        return;
      }

      // Atualiza os campos com os dados recebidos
      document.querySelector("#dadoRua").innerText = dados.logradouro;
      document.querySelector("#dadoBairro").innerText = dados.bairro;
      document.querySelector("#dadoCidade").innerText = dados.localidade;
      document.querySelector("#dadoEstado").innerText = dados.uf;

      // Registra sucesso no log
      salvarLog('CEP', { cep }, {
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        localidade: dados.localidade,
        uf: dados.uf
      }, 'sucesso', url);
    })
    .catch((error) => {
      console.error('Erro na consulta:', error);
      salvarLog('CEP', { cep }, 'Erro na consulta: ' + error.message, 'erro', url);
      alert('Erro ao buscar CEP. Verifique sua conexão.');
    });
}