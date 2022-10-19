function arrayUsuariosPesquisados(){
    return JSON.parse(localStorage.getItem("@usuariosPesquisados:Obj")) || []
}

function capturarValorInput(){
    const input = document.querySelector(".inputUsuario")
    const botaoUsuario = document.querySelector("#botaoUsuario")
    const pAlerta = document.querySelector(".usuarioNaoEncontrado")

    input.addEventListener("keypress", ()=>{
        input.className = "inputUsuario bordaPadrao"
        pAlerta.className = "usuarioNaoEncontrado"
    if(input.value !== ""){
        botaoUsuario.disabled = false
        botaoUsuario.className = "botaoPadrao3 salmao"  
    }
    })
   
    botaoUsuario.disabled = true
    botaoUsuario.className = "botaoDesabilitado"

    botaoUsuario.addEventListener("click", (event)=>{
        event.preventDefault()

        botaoUsuario.innerHTML = ""
        const img = document.createElement("img")
        img.src = "../src/img/spinner.png"
        img.classList.add("carregar")
        botaoUsuario.append(img)

        requisicaoUsuario(input.value, botaoUsuario, input)
    })
}
capturarValorInput()


const url = "https://api.github.com/users"
const headers = {"Content-Type": "application/json"}


async function requisicaoUsuario(nomeUsuario, botaoUsuario){
    await fetch(`${url}/${nomeUsuario}`,{
        method:"GET",
        headers: headers
    })
    .then(resp => resp.json())
    .then(resp => {
        acessarUsuarioSelecionado(resp, nomeUsuario)
        botaoUsuario.innerHTML = ""
        botaoUsuario.innerText = "Ver perfil do github" 
    })
    .catch(err=> console.log(err)) 
}

function acessarUsuarioSelecionado(resp, nomeUsuario){
    const arrayPesquisados = arrayUsuariosPesquisados()
    const input = document.querySelector(".inputUsuario")
    const pAlerta = document.querySelector(".usuarioNaoEncontrado")

    if(resp.message !== "Not Found"){
        localStorage.removeItem("@usuario:Obj")
        localStorage.setItem("@usuario:Obj", JSON.stringify(resp))

        requisicaoRepositorios(nomeUsuario) 

        if(usuarioExiste(resp) === -1){
            arrayPesquisados.push(resp)
            localStorage.setItem("@usuariosPesquisados:Obj", JSON.stringify(arrayPesquisados))
            renderizar3UltimosPesquisados(arrayPesquisados)
        }
    }else{
        input.className = "inputUsuario bordaAlerta"
        pAlerta.classList.add("displayBlock")
    }
}

async function requisicaoRepositorios(nomeUsuario){
    await fetch(`${url}/${nomeUsuario}/repos`,{
        method:"GET",
        headers: headers
    })
    .then(resp => resp.json())
    .then(resp => {
        localStorage.removeItem("@repositorios:Obj")
        localStorage.setItem("@repositorios:Obj", JSON.stringify(resp))

        window.location.assign("/pages/profile/profile.html")
    })
    .catch(err=> console.log(err)) 
}

function renderizar3UltimosPesquisados(array){
    const ul = document.querySelector(".ulPesquisados")
    ul.innerHTML = ""
    
    if(array.length > 3){
        array.splice(0,1)
        localStorage.setItem("@usuariosPesquisados:Obj", JSON.stringify(array))        
    }
    array.forEach(usuario => {
        const li = criarCardsUsuariosPesq(usuario)
        ul.append(li)
    });
    
    
}
renderizar3UltimosPesquisados(arrayUsuariosPesquisados())

function criarCardsUsuariosPesq(usuario){
    const li = document.createElement("li")
    const img = document.createElement("img")
    const p = document.createElement("p")

    li.className = "liPesquisados"
    li.addEventListener("click", ()=>{
        acessarUsuarioSelecionado(usuario, usuario.login)
    })
    img.src = usuario.avatar_url
    p.innerText = "Acessar este perfil"

    li.append(img, p)

    return li
}

function usuarioExiste(objeto){
    const arrayPesquisados = arrayUsuariosPesquisados()

    const index = arrayPesquisados.findIndex(elemento =>{
        if(objeto.id === elemento.id){
            return elemento
        }
    })
    return index
}




