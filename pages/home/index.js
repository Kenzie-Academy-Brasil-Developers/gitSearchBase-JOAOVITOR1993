import requisicaoUsuario from "../profile/profile.js"

function capturarValorInput(){
    const input = document.querySelector(".inputUsuario")
    const button = document.querySelector("#botaoUsuario")

    button.addEventListener("click", (event)=>{
        event.preventDefault()
        requisicaoUsuario(input.value)
    })
}
capturarValorInput()




