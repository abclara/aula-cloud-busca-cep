function listarLogs() {
    // console.log("Listando Logs")

    let logs = JSON.parse(localStorage.getItem('logs')) || [];
    console.log(logs);

    let listaLogs = document.querySelector("#lista-logs")

    listItens = ""

    for (let log of logs){
        listItens += `<li class="collection-item">Busquei no(a) ${log.tipo} na URL ${log.url} em ${log.data} <a onclick="montarLogs('${log.url}')" class="material-icons prefix">remove_red_eye</a> </li>
        `
    }

    listaLogs.innerHTML = listItens
}