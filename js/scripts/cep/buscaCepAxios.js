async function buscaCepAxios() {
  // Pega o valor do CEP digitado
  let cep = document.querySelector("input").value;
  console.log("buscando cep", cep);

  // Monta a URL da API ViaCEP
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  //mostrarBarra(); // 👈 mostra a barrinha

  // Requisição com Axios
  axios.get(url)
    .then(function (response) {
      console.log('imprimindo com axios', response.data);

      // Atualiza os campos com os dados recebidos
      let dados = response.data;
      document.querySelector("#dadoRua").innerText = dados.logradouro;
      document.querySelector("#dadoBairro").innerText = dados.bairro;
      document.querySelector("#dadoCidade").innerText = dados.localidade;
      document.querySelector("#dadoEstado").innerText = dados.uf;
    })

    //.finally(() => esconderBarra()); // 👈 esconde no final
}