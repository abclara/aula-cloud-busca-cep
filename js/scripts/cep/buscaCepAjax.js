async function buscaCepAjax() {
  // Pega o valor do CEP digitado
  let cep = document.querySelector("input").value;
  console.log("buscando cep", cep);

  // Monta a URL da API ViaCEP
  let url = `https://viacep.com.br/ws/${cep}/json/`;

  // Faz a requisição via jQuery AJAX
  $.ajax({
    url: url,
    method: 'GET',
    success: function (data) {
      console.log(data);

      // Atualiza os campos com os dados recebidos
      document.querySelector("#dadoRua").innerText = data.logradouro;
      document.querySelector("#dadoBairro").innerText = data.bairro;
      document.querySelector("#dadoCidade").innerText = data.localidade;
      document.querySelector("#dadoEstado").innerText = data.uf;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Erro na requisição:', textStatus, errorThrown);
    }
  });
}