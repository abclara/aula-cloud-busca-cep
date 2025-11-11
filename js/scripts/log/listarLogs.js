function listarLogs(){
    let logs = JSON.parse(localStorage.getItem('logs')) || [];
    console.log(logs);
    let listaLogs = document.querySelector("#lista-logs")
    listItems = ""
    for(let log of logs){
        listItems += `
        <li class="collection-item">
          Busquei no(a) ${log.tipo} na URL ${log.url} em ${log.data}
          <a onclick="montarLogs('${log.url}')" class="waves-effect waves-light"><i class="material-icons left">remove_red_eye</i></a>
        </li>
        `
    }
    listaLogs.innerHTML = listItems;
}