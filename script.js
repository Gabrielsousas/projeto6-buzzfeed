
let guardaTodosQuizzes = {};
let titulo;
let urlImagem;
let qtdPerguntas;
let qtdNiveis;

let dados = {
    title: '',
    image: '',
    questions: [],
    levels: []
}
pegaTodosQuizzesServidor();

// Scripts Guilherme ----------------------------------------------------------

function criarQuizz() {
    document.querySelector('.screen-1').classList.add('hidden');
    document.querySelector('.screen-3').classList.remove('hidden');
}

function validarCriacaoDoQuizz() {
    titulo = document.querySelector(".input-titulo").value;
    urlImagem = document.querySelector(".input-imagem").value;
    qtdPerguntas = document.querySelector(".input-qtdPerguntas").value;
    qtdNiveis = document.querySelector(".input-qtdNiveis").value;

    if ((titulo.length > 20 && titulo.length < 65) && (checkUrl(urlImagem)) && (qtdPerguntas >= 3 && qtdNiveis >= 2)) {
        document.querySelector(".screen-3-1").classList.add("hidden");
        document.querySelector(".screen-3-2").classList.remove("hidden");

        dados.title = titulo;
        dados.image = urlImagem;

    } else {
        alert(`
        Temos algo de errado!

        Garanta que os seguintes requisitos estão sendo respeitados:
        1. Título do quizz: deve ter no mínimo 20 e no máximo 65 caracteres.
        2. URL da Imagem: deve ter formato de URL.
        3. Quantidade de perguntas: no mínimo 3 perguntas.
        4. Quantidade de níveis: no mínimo 2 níveis.
        
        Por favor, tente preencher os campos corretamente antes de prosseguir.`)
    }
}

criarPerguntas();

function criarPerguntas() {
    let perguntas = document.querySelector(".screen-3-2");
    console.log(perguntas)

    for (i = 1; i <= qtdPerguntas; i++) {
        perguntas.innerHTML += `
        <div class="caixa-pergunta caixa-pergunta-${i}">
        <h3 class="h3-screen3">Pergunta ${i}</h3>
        <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="pergunta-${i} caixa-formulario hidden">
        <h3 class="h3-screen3">Pergunta ${i}</h3>
        <input id="#${i}pergunta" class="input-pergunta-${i}" type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta">
        <h3 class="h3-screen3">Resposta correta</h3>
        <input id="#${i}resposta" class="input-resposta-${i}" type="text" placeholder="Resposta correta">
        <input id="#${i}resposta-img" type="text" placeholder="URL da imagem">
        <h3 class="h3-screen3">Respostas incorretas</h3>
        <input id="#${i}erro-1" class="erro" type="text" placeholder="Resposta incorreta ${i}">
        <input id="#${i}erro-1-img" type="text" placeholder="URL da imagem ${i}">
        <input id="#${i}erro-2" class="erro" type="text" placeholder="Resposta incorreta 2">
        <input id="#${i}erro-2-img" type="text" placeholder="URL da imagem 2">
        <input id="#${i}erro-3" class="erro" type="text" placeholder="Resposta incorreta 3">
        <input id="#${i}erro-3-img" type="text" placeholder="URL da imagem 3">
      </div>
        `
    }
}


function checkUrl(str) {
    var a = document.createElement('a');
    a.href = str;
    return (a.host && a.host != window.location.host);
}

// Final de Scripts Guilherme -------------------------------------------------

function pegaTodosQuizzesServidor() {
    const pegaTodosQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    pegaTodosQuizzes.then(listaTodosQuizzes);
    pegaTodosQuizzes.catch(error);
}

function listaTodosQuizzes(resposta) {
    guardaTodosQuizzes = {};
    guardaTodosQuizzes = resposta.data;
    const listaQuiz = document.querySelector('ul');
    listaQuiz.innerHTML = '';
    console.log(guardaTodosQuizzes);
    for (let i = 0; i < guardaTodosQuizzes.length; i++) {
        const template = `
        <li onclick="acessarScreen2()">
            <div class="caixaQuizz">                
                <p>${guardaTodosQuizzes[i].title}</p>
            </div>
        </li>
        `;

        listaQuiz.innerHTML += template;
        const backLi = document.querySelector('ul').children[i];
        backLi.style.backgroundImage = `url(${guardaTodosQuizzes[i].image})`;

    }
}
function acessarScreen2() {
    document.querySelector(".screen-1").classList.add("hidden");
    //INSERIR TELA 2
}
function error() {
    alert("erro");
}
