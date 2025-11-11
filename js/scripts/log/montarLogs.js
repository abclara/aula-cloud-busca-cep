function montarLogs(url) {
    console.log("montando logs", url)
    let params = url.split("/")
    console.log(params)

    if (params.length == 7) {
        document.querySelector("#cep-link").click()
        document.querySelector("#cep").value = params[4]
        buscaCepFetch()
    } else {
        document.querySelector("#rua-link").click()
        document.querySelector("#estado").value = params[4]
        document.querySelector("#rua").value = params[6]
        
        setTimeout(() => {
            pegarCidades()
        }, 500)
        setTimeout(() => {
            document.querySelector("#cidade").value = params[5]
            buscaRua()
        }, 1000)
    }
}