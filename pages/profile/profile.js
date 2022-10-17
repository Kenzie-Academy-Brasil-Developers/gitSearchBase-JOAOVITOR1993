const url = "https://api.github.com/users"
const headers = {"Content-Type": "application/json"}


async function requisicaoUsuario(nomeUsuario){
    const usuario = await fetch(`${url}/${nomeUsuario}`,{
        method:"GET",
        headers: headers
    })
    .then(resp => resp.json())
    .then(resp => {
        return resp
    })
    .catch(err=> console.log(err))

    renderizarUsuario(usuario)
}



//"JOAOVITOR1993"

function renderizarUsuario(data){
    const img = document.querySelector(".imgPerfil")
    const h1 = document.querySelector(".nome")
    const p = document.querySelector(".bio")

    img.src = data.avatar_url
    h1.innerText = data.name
    p.innerText = data.bio

}



const ul = document.querySelector(".repositorios")
// const li = criarCardsRepo()
// ul.append(li)

function criarCardsRepo(objeto){
    const li = document.createElement("li")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    const div = document.createElement("div")
    const botaoRepo = document.createElement("button")
    const aRepo = document.createElement("a")     
    const botaoDemo = document.createElement("button")
    const aDemo = document.createElement("a")

    h2.innerText = objeto.name
    p.innerText = objeto.description
    div.className = "botoes"
    botaoRepo.className = "botaoPadrao3 preto"
    aRepo.href = objeto.html_url
    aRepo.target = "_blank"
    aRepo.innerText = "Repositório"
    botaoDemo.className = "botaoPadrao3 preto"
    aDemo.href = ""
    aDemo.target = "_blank"
    aDemo.innerText = "Demo"

    li.append(h2, p, div)
    div.append(botaoRepo, botaoDemo)
    botaoRepo.append(aRepo)
    botaoDemo.append(aDemo)

    return li
}


export default requisicaoUsuario