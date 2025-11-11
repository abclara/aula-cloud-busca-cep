function salvarLogs(url, tipo) {
    console.log('salvando logs')
    let log = {
        url: url,
        data: new Date().toLocaleString(),
        tipo: tipo
    }

    let logs = JSON.parse(localStorage.getItem('logs')) || [] // se não tiver nada, cria um array vazio
    logs.push(log) // adiciona o novo log no array
    localStorage.setItem('logs', JSON.stringify(logs)) // salva o array atualizado no localStorage
}