//Função assíncrona para requisições
document.querySelector(".busca").addEventListener("submit", async (event) => {
    event.preventDefault() //Previne o funcionamento padrão do navegador

    let input = document.querySelector("#searchInput").value //Capturar as informações digitadas

    if(input !== "") { //Se estiver preenchido
        clearInfo()
        showWarning("Carregando...")

        //Endereço da API com a utlização do encoder ao utilizar os dados inseridos na tela
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d3c3e395a252720a38e67d1634ee5c0b&units=metric&lan=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod === 200) { //Quando o status for 200 (OK) retornará as seguintes informações da API
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }
        else { //Se o dado não for encontrado retorna um aviso
            clearInfo()
            showWarning("Não encontramos esta localaização")
        }
    }
    else {
        clearInfo()
    }
})

//Pega os campos da tela e envia para eles os dados json
function showInfo(json) {
    showWarning("")

    document.querySelector(".resultado").style.display = "block"
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>°C</sup>`
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle}deg)`
}

//Limpa os dados da tela
function clearInfo() {
    showWarning("")
    document.querySelector(".resultado").style.display = "none"
}

//Apresenta e mensagem de erro
function showWarning(message) {
    document.querySelector(".aviso").innerHTML = message
}