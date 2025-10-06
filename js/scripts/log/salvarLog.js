function salvarLog(url, tipo) {

    // FEITO EM SALA DIA 16/09/2025, DEU CERTO!
   console.log("Salvando LOG")

   let log = {

    url: url,
    data: new Date().toLocaleString(),
    tipo: tipo

    }

    let logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push(log)
    localStorage.setItem('logs', JSON.stringify(logs))
    
}

// tem que pegar o log e ele vai salvar na área do LOG