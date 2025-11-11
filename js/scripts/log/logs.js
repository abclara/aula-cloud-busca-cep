function salvarLog(tipoConsulta, parametros, resultado, status = 'sucesso', url = '') {
  const agora = new Date();
  const timeStamp = agora.toLocaleString('pt-BR');

  // Normaliza resultado
  let resultadoNormalizado;
  if (status === 'sucesso') {
    if (tipoConsulta === 'CEP') {
      resultadoNormalizado = {
        logradouro: resultado.logradouro || '',
        bairro: resultado.bairro || '',
        localidade: resultado.localidade || '',
        uf: resultado.uf || ''
      };
    } else if (tipoConsulta === 'RUA') {
      resultadoNormalizado = {
        quantidade: resultado.quantidade || 0
      };
    }
  } else {
    resultadoNormalizado = { erro: resultado }; // sempre objeto
  }

  const novoLog = {
    url,
    timestamp: timeStamp,
    tipo: tipoConsulta,
    parametros,
    resultado: resultadoNormalizado,
    status
  };

  let logs = JSON.parse(localStorage.getItem('logsConsultas')) || [];
  logs.unshift(novoLog);
  if (logs.length > 50) logs = logs.slice(0, 50);
  localStorage.setItem('logsConsultas', JSON.stringify(logs));
  console.log('Log salvo:', novoLog);
}


// Recupera os logs salvos
function recuperarLogs() {
  return JSON.parse(localStorage.getItem('logsConsultas')) || [];
}

// Limpa todos os logs salvos
function limparLogs() {
  localStorage.removeItem('logsConsultas'); // Remove do localStorage
  carregarLogs(); // Atualiza a tela
  console.log('Logs limpos');
}

// Carrega os logs e exibe na tela
function carregarLogs() {
  const logs = recuperarLogs(); // Pega os logs
  const listaLogs = document.querySelector('#lista-logs'); // Área onde os logs aparecem

  // Se não houver logs, mostra mensagem
  if (logs.length === 0) {
    listaLogs.innerHTML = `
      <div class="card-panel red lighten-4">
        <p class="center"><i class="material-icons left">mood_bad</i>
        Nenhum registro foi encontrado. Faça algumas buscas para que o histórico apareça aqui.</p>
      </div>
    `;
    return;
  }

  let logsHTML = ''; // HTML que será montado

  // Para cada log, cria um card com os dados
  logs.forEach(log => {
    const corCard = 'blue lighten-5'; // Cor do card
    const corTexto = log.status === 'sucesso' ? 'blue-text text-darken-2' : 'blue-text text-lighten-1';

    // Texto dos parâmetros da consulta
    let parametrosTexto = log.tipo === 'CEP'
      ? `CEP: ${log.parametros.cep}`
      : `Estado: ${log.parametros.estado}, Cidade: ${log.parametros.cidade}, Rua: ${log.parametros.rua}`;

    // Texto do resultado da consulta
    let resultadoTexto;
if (log.status === 'sucesso') {
  if (log.tipo === 'CEP') {
    resultadoTexto = `${log.resultado?.logradouro || ''}, ${log.resultado?.bairro || ''}, ${log.resultado?.localidade || ''} - ${log.resultado?.uf || ''}`;
  } else {
    resultadoTexto = typeof log.resultado?.quantidade !== 'undefined'
      ? `${log.resultado.quantidade} resultado(s) encontrado(s)`
      : "Nenhum resultado encontrado";
  }
} else {
  resultadoTexto = log.resultado?.erro || log.resultado || "Erro desconhecido";
}

    // Monta o HTML do card
    logsHTML += `
      <div class="card-panel ${corCard}" style="padding: 8px; margin-bottom: 8px; position: relative;" data-log-index="${logs.indexOf(log)}">
        <div class="row" style="margin-bottom: 0;">
          <div class="col s12" style="position: relative; text-align: left;">
            <span class="badge ${corTexto}">${log.tipo}</span>
            <span class="grey-text text-darken-2" style="position: absolute; top: 0; right: 20;">${log.timestamp}</span>
          </div>
        </div>
        <div class="row" style="margin-bottom: 0;">
          <div class="col s12" style="text-align: left;">
            <p><strong>Consulta:</strong> ${parametrosTexto}</p>
            <p><strong>Resultado:</strong> ${resultadoTexto}</p>
            ${log.url ? `<p><strong>URL:</strong> <a href="${log.url}" target="_blank" class="blue-text">${log.url}</a></p>` : ''}
          </div>
        </div>
        <div class="row" style="margin-bottom: 0;">
          <div class="col s12" style="text-align: right;">
            <i class="material-icons" style="cursor: pointer; font-size: 28px; color: #1a237e;" onclick="reexecutarConsulta(${logs.indexOf(log)})" title="Reexecutar consulta">remove_red_eye</i>
          </div>
        </div>
      </div>
    `;
  });

  // Insere os cards na tela
  listaLogs.innerHTML = logsHTML;
}

// Reexecuta uma consulta salva no log
function reexecutarConsulta(logIndex) {
  const logs = recuperarLogs(); // Pega os logs
  const log = logs[logIndex]; // Seleciona o log pelo índice

  if (!log) {
    console.error('Log não encontrado');
    return;
  }

  // Se for consulta de CEP
  if (log.tipo === 'CEP') {
    const tabCep = document.querySelector('a[href="#tab-cep"]');
    if (tabCep) tabCep.click(); // Abre a aba CEP

    setTimeout(() => {
      const campoCep = document.querySelector('#cep');
      if (campoCep) {
        campoCep.value = log.parametros.cep;
        M.updateTextFields(); // Atualiza os campos do Materialize
        if (typeof buscaCepFetch === 'function') buscaCepFetch(); // Executa a busca
      }
    }, 100);

  // Se for consulta de RUA
  } else if (log.tipo === 'RUA') {
    const tabRua = document.querySelector('a[href="#tab-rua"]');
    if (tabRua) tabRua.click(); // Abre a aba RUA

    setTimeout(() => {
      const campoEstado = document.querySelector('#estado');
      const campoCidade = document.querySelector('#cidade');
      const campoRua = document.querySelector('#rua');

      if (campoEstado) {
        campoEstado.value = log.parametros.estado;
        if (typeof pegarCidades === 'function') {
          pegarCidades(); // Carrega cidades do estado
          setTimeout(() => {
            if (campoCidade) campoCidade.value = log.parametros.cidade;
          }, 1000); // Espera carregar cidades
        }
      }

      if (campoRua) {
        campoRua.value = log.parametros.rua;
        M.updateTextFields(); // Atualiza os campos
      }

      setTimeout(() => {
        if (typeof buscaRua === 'function') buscaRua(); // Executa a busca
      }, 1500);
    }, 100);
  }
}

// Quando a aba LOGS for aberta, carrega os logs
document.addEventListener('DOMContentLoaded', function() {
  const tabsInstance = M.Tabs.getInstance(document.querySelector('.tabs'));
  if (tabsInstance) {
    tabsInstance.options.onShow = function(content) {
      if (content.id === 'tab-log') carregarLogs();
    };
  }
});