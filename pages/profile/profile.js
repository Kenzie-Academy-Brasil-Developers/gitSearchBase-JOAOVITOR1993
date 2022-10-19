function buscarUsuarioObj(){
    return JSON.parse(localStorage.getItem("@usuario:Obj")) || []
}

function buscarRepositoriosObj(){
    return JSON.parse(localStorage.getItem("@repositorios:Obj")) || []
}

function renderizarUsuario(data){
    const img = document.querySelector(".imgPerfil")
    const h1 = document.querySelector(".nome")
    const p = document.querySelector(".bio")
    const botaoTrocar = document.querySelector(".botaoTrocarUsuario")
    const botaoEmail = document.querySelector(".botaoEmail")
    const aEmail = document.querySelector(".aEmail")

    img.src = data.avatar_url
    h1.innerText = data.name
    p.innerText = data.bio 
    botaoTrocar.addEventListener("click", ()=>{
        window.location.assign("../../index.html")
    })
    botaoEmail.addEventListener("click", ()=>{
        aEmail.href = `mailto:${data.email}`
    })
    aEmail.target = "_blank"

}
renderizarUsuario(buscarUsuarioObj())

function renderizarCardsRepo(data){
    const ul = document.querySelector(".repositorios")
    data.forEach(repositorio =>{
        const li = criarCardsRepo(repositorio)
        ul.append(li)
    })
}
renderizarCardsRepo(buscarRepositoriosObj())

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


