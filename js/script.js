const secaoFinal = document.getElementById("final");
const resumoFinal = document.getElementById("resumoFinal");

const intro = document.getElementById("intro");

let dataSelecionada = "";
let tipoSelecionado = "";
let restauranteSelecionado = "";
let horarioSelecionado = "";

const secaoInicio = document.getElementById("inicio");
const secaoMensagem = document.getElementById("mensagem");
const secaoConvite = document.getElementById("convite");
const secaoData = document.getElementById("data");
const secaoTipo = document.getElementById("tipo-date");
const secaoHorario = document.getElementById("horario");
const secaoConfirmacao = document.getElementById("confirmacao");

const secoes = [
    secaoInicio,
    secaoMensagem,
    secaoConvite,
    secaoData,
    secaoTipo,
    secaoHorario,
    secaoConfirmacao,
    secaoFinal
];

history.replaceState(
    { id: "inicio" },
    "",
    "#inicio"
);

function trocarSecao(secaoAtual, proximaSecao){

    secoes.forEach(secao => {
        secao.classList.add("oculta");
    });

    proximaSecao.classList.remove("oculta");

    history.pushState(
        { id: proximaSecao.id },
        "",
        "#" + proximaSecao.id
    );

    proximaSecao.scrollIntoView({
        behavior: "smooth"
    });

}

const btnDescobrir = document.getElementById("btnDescobrir");
btnDescobrir.addEventListener("click", function(){

    trocarSecao(secaoInicio, secaoMensagem)
});

const botaoAbrir = document.getElementById("abrirCarta");
const pergaminho = document.getElementById("pergaminho");

botaoAbrir.addEventListener("click", function (){

    pergaminho.classList.add("aberto");

    botaoAbrir.style.display = "none";

});

const continuar = document.getElementById("continuar");

const convite = document.getElementById("convite");

continuar.addEventListener("click", function(){

    trocarSecao(secaoMensagem, secaoConvite);

});

const btnSim = document.getElementById("btnSim");

btnSim.addEventListener("click", function(){

    trocarSecao(secaoConvite, secaoData);

});

const btnNao = document.getElementById("btnNao");

const mensagemNao = document.getElementById("mensagemNao");

const frases = [
    "🥺 Tem certeza?",
    "😅 Quase conseguiu.",
    "🙃 Esse botão é bem medroso.",
    "✨ O botão 'Sim' parece mais interessante...",
    "😭 Qual é, deu trabalho.",
    "😶 Tá... essa foi por pouco.",
    "😁 Ainda dá tempo de mudar de ideia.",
    "💻 Isso deu muito mais trabalho do que parece KKKK.",
    "😂 Acho que ele é rápido demais KKKK."
];

const cardConvite = btnNao.closest(".card-convite");

let iniciouFuga = false;

const botoes = document.querySelector(".botoes");

function fugir(){

    const area = botoes.getBoundingClientRect();

    if(!iniciouFuga){

        const rect = btnNao.getBoundingClientRect();

        btnNao.style.position = "absolute";
        btnNao.style.left = (rect.left - area.left) + "px";
        btnNao.style.top = (rect.top - area.top) + "px";

        iniciouFuga = true;
    }

    const margem = 20;
    const maxX = area.width - btnNao.offsetWidth - margem; 
    const maxY = area.height - btnNao.offsetHeight - margem; 
    const x = margem + Math.random() * (maxX - margem); 
    const y = margem + Math.random() * (maxY - margem); 
    btnNao.style.left = x + "px"; btnNao.style.top = y + "px"; 
    mensagemNao.textContent = frases[Math.floor(Math.random() * frases.length)]; 
    btnNao.blur(); 
}

btnNao.addEventListener("mouseenter", fugir);

btnNao.addEventListener("touchstart", function(e){
    e.preventDefault();
    e.stopPropagation();
    fugir();
}, { passive: false });

btnNao.addEventListener("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    fugir();
});

const dataEscolhida = document.getElementById("dataEscolhida");

const mensagemData = document.getElementById("mensagemData");

const btnHorario = document.getElementById("continuarHorario");

btnHorario.disabled = true;

dataEscolhida.addEventListener("change", function(){

    const hoje = new Date();
    hoje.setHours(0,0,0,0);

    const anoAtual = hoje.getFullYear();

    if (!dataEscolhida.value) {

        mensagemData.textContent = "📅 Escolha uma data."
        mensagemData.style.color = "#C0392B";
        btnHorario.disabled = true;
        return;
    }

    const partes = dataEscolhida.value.split("-");

    const data = new Date(
        partes[0],
        partes[1] - 1,
        partes[2]
    );

    const dataFormatada = data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    if(data.getFullYear() > anoAtual){

        mensagemData.textContent = 

        "📅 Talvez seja melhor marcarmos ainda este ano.";

        mensagemData.style.color = "#C0392B";

        btnHorario.disabled = true;

        return;

    }

    if(data.getFullYear() < anoAtual){

        mensagemData.textContent = 

        "📅 Essa data já ficou no passado...";

        mensagemData.style.color = "#C0392B";

        btnHorario.disabled = true;

        return;

    }

    if(data < hoje){

        mensagemData.textContent = 

        "📅 Esse dia já passou. Que tal escolher outro?";

        mensagemData.style.color = "#C0392B";

        btnHorario.disabled = true;

        return;

    }

    mensagemData.textContent = 
    "✨ Perfeito! Essa data parece ótima.";

    mensagemData.style.color = "#4CAF50";

    dataSelecionada = dataEscolhida.value;

    btnHorario.disabled = false;
});

btnHorario.addEventListener("click", function(){

    trocarSecao(secaoData, secaoTipo);

});

const horarioEscolhido = 
document.getElementById("horarioEscolhido");

const mensagemHorario = 
document.getElementById("mensagemHorario");

const continuarTipo = 
document.getElementById("continuarTipo");

continuarTipo.disabled = true;

horarioEscolhido.addEventListener("change", function(){

    if(horarioEscolhido.value == ""){

        mensagemHorario.textContent = 
        "⏰ Escolha um horário.";

        mensagemHorario.style.color = "#C0392B";

        continuarTipo.disabled = true;

    }else{

        mensagemHorario.textContent = 
        "✨ Excelente horário!";

        mensagemHorario.style.color = "#4CAF50";

        continuarTipo.disabled = false;

        horarioSelecionado = horarioEscolhido.value;

    }

});

const restaurantes = {

     pizza: [
        "(⭐4,7) IL Fratello - R. Treze de maio, 482",
        "(⭐4,6) Don Pasquale - R. 9 de julho, 993"
    ],
    
     massas: [
        "(⭐5,0) La Famiglia Felice - R. Gen. Milton Fernandes de Melo, 1390",
    ]

};

const categorias = document.querySelectorAll(".categoria");

const listaRestaurantes = document.getElementById("listaRestaurantes");

const continuarRestaurante = 
document.getElementById("continuarRestaurante");

continuarRestaurante.disabled = true;

categorias.forEach(categoria => {

    categoria.addEventListener("click", function(){

        categorias.forEach(c => c.classList.remove("ativa"));

        categoria.classList.add("ativa");

        const tipo = categoria.dataset.tipo;

        tipoSelecionado = tipo;

        mostrarRestaurantes(tipo);

    });

});

function mostrarRestaurantes(tipo){

    listaRestaurantes.innerHTML = "";

    const titulo = document.createElement("h3");

    titulo.textContent = "Escolha o lugar 😊";

    listaRestaurantes.appendChild(titulo);

    restaurantes[tipo].forEach(nome => {

        const div = document.createElement("div");

        div.className = "opcao-restaurante";

        div.textContent = nome;

        div.addEventListener("click", function(){

            document
                .querySelectorAll(".opcao-restaurante")
                .forEach(r => r.classList.remove("selecionado"));

            div.classList.add("selecionado");

            restauranteSelecionado = nome;

            continuarRestaurante.disabled = false;

        });

        listaRestaurantes.appendChild(div);

    });

}

continuarRestaurante.addEventListener("click", function(){

    trocarSecao(secaoTipo, secaoHorario);

});

const resumoDate = document.getElementById("resumoDate");
const confirmarDate = document.getElementById("confirmarDate");



continuarTipo.addEventListener("click", function(){

    const dataFormatada = formatarData(dataSelecionada);


    resumoDate.innerHTML = `
    <p><strong>📅 Data:</strong> ${dataFormatada}</p>
    <p><strong>🍽️ Tipo:</strong> ${nomeCategorias[tipoSelecionado]}</p>
    <p><strong>📍 Restaurante:</strong> ${restauranteSelecionado}</p>
    <p><strong>⏰ Horário:</strong> ${horarioSelecionado}</p>
    `;

    trocarSecao(secaoHorario, secaoConfirmacao);

});

const nomeCategorias = {

    pizza: "🍕 Pizza",
    massas: "🍝 Massas"
}

confirmarDate.addEventListener("click", function () {

    resumoFinal.innerHTML = `
    <p><strong>📅 Data:</strong> ${formatarData(dataSelecionada)}</p>
    <p><strong>🍽️ Tipo:</strong> ${nomeCategorias[tipoSelecionado]}</p>
    <p><strong>📍 Restaurante:</strong> ${restauranteSelecionado}</p>
    <p><strong>⏰ Horário:</strong> ${horarioSelecionado}</p>
    `;

    trocarSecao(secaoConfirmacao, secaoFinal);

    confetti({
        particleCount: 250,
        spread: 140,
        origin: { y: 0.6 }
    });

    // Envia o e-mail sem travar a interface
    fetch("https://formsubmit.co/ajax/pedro_banhara@icloud.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            _subject: "💛 A Nicole confirmou o date!",
            _template: "table",
            _captcha: "false",

            Data: formatarData(dataSelecionada),
            Tipo: nomeCategorias[tipoSelecionado],
            Restaurante: restauranteSelecionado,
            Horario: horarioSelecionado
        })
    })
    .catch(error => console.error(error));

});

window.addEventListener("popstate", function () {

    const id = window.location.hash.replace("#", "") || "inicio";

    secoes.forEach(secao => {
        secao.classList.add("oculta");
    });

    const secao = document.getElementById(id);

    if (secao) {
        secao.classList.remove("oculta");

        secao.scrollIntoView({
            behavior: "smooth"

        });
    }

});

const particulas = 
document.getElementById("particulas");

for(let i=0;i<35;i++){

    const p =
    document.createElement("div");

    p.className="particula";

    p.style.left =
    Math.random()*100+"vw";

    p.style.animationDuration =
    Math.random()*10+"s";

    p.style.width =
    p.style.height =
    (2+Math.random()*6)+"px";

    particulas.appendChild(p);
}

window.addEventListener("load", function(){

    setTimeout(function(){

        intro.classList.add("esconder");

    },2500);

});

function formatarData(data) {

    const dataFormatada = new Date(data + "T00:00:00");

    return dataFormatada.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}