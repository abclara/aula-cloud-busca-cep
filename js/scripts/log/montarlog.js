function montarLogs(url) {
    console.log("Montando LOGS",url)
    let params = url.split("/")
    console.log(params)

    // Para fragmentar a URL pra descobrir o tipo
    if (params.length == 7){
        console.log("TIPO CEP")
        $("#cep-link").addClass("active");
    } else {
        console.log("TIPO RUA")
    }
        
    // CEP /4 - total 7, RUA /4,/5,/6 - total 9
}