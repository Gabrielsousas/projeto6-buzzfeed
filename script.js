
let guardaTodosQuizzes = {};
let titulo;
let urlImagem;
let qtdPerguntas;
let qtdNiveis;
let quizzId = 19379;
let perguntas = [];
const dados = {
    title: '',
    image: '',
    questions: [],
    levels: []
}
pegaTodosQuizzesServidor();

// Scripts Guilherme ----------------------------------------------------------

function criarQuizz() {
    
    document.querySelector('.screen-1').classList.add('hidden');
    document.querySelector('.screen-2').classList.add('hidden');
    document.querySelector('.screen-3').classList.remove('hidden');
    document.querySelector('.screen-3-1').classList.remove('hidden');
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

        criarPerguntas();

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

function criarPerguntas() {
    let perguntas = document.querySelector(".screen-3-2");

    for (i = 1; i <= qtdPerguntas; i++) {
        perguntas.innerHTML += `
        <div class="caixa-pergunta caixa-pergunta-${i}" onclick="abrirPergunta(${i})">
        <h3 class="h3-screen3">Pergunta ${i}</h3>
        <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="pergunta-${i} caixa-formulario hidden">
        <h3 class="h3-screen3">Pergunta ${i}</h3>
        <input id="${i}pergunta" class="input-pergunta-${i}" type="text" placeholder="Texto da pergunta">
        <input id="${i}cor" type="text" placeholder="Cor de fundo da pergunta">
        <h3 class="h3-screen3">Resposta correta</h3>
        <input id="${i}resposta" class="input-resposta-${i}" type="text" placeholder="Resposta correta">
        <input id="${i}resposta-img" type="text" placeholder="URL da imagem">
        <h3 class="h3-screen3">Respostas incorretas</h3>
        <input id="${i}erro-1" class="erro" type="text" placeholder="Resposta incorreta ${i}">
        <input id="${i}erro-1-img" type="text" placeholder="URL da imagem ${i}">
        <input id="${i}erro-2" class="erro" type="text" placeholder="Resposta incorreta 2">
        <input id="${i}erro-2-img" type="text" placeholder="URL da imagem 2">
        <input id="${i}erro-3" class="erro" type="text" placeholder="Resposta incorreta 3">
        <input id="${i}erro-3-img" type="text" placeholder="URL da imagem 3">
      </div>
        `
    }

    perguntas.innerHTML += `
    <button onclick="validarCriacaoDasPerguntas()">Prosseguir para criar níveis</button>
    `
}

function criarNiveis() {
    let niveis = document.querySelector(".screen-3-3");
    console.log(niveis);

    for (i = 1; i <= qtdNiveis; i++) {
        niveis.innerHTML += `
        <div class="caixa-nivel caixa-nivel-${i}" onclick="abrirNivel(${i})">
        <h3 class="h3-screen3">Nível ${i}</h3>
        <ion-icon name="create-outline"></ion-icon>
        </div>
        <div class="nivel-${i} caixa-formulario hidden">
        <h3 class="h3-screen3">Nível ${i}</h3>
        <input id="${i}nivel-titulo" type="text" placeholder="Título do nível">
        <input id="${i}nivel-acerto" type="text" placeholder="% de acerto mínimo">
        <input id="${i}nivel-url" type="text" placeholder="URL da imagem do nível">
        <textarea id="${i}nivel-descricao" class="nivel-descricao" placeholder="Descrição do nível" cols="30" rows="10"></textarea>
        </div>
        `
    }
    niveis.innerHTML += `
    <button onclick="validarCriacaoDosNiveis()">Finalizar Quizz</button>
    `
}

function criarFinalizacao() {
    let final = document.querySelector(".screen-3-4");
    
    final.innerHTML += `
    <div class="imagem-final" onclick="acessarScreen2()">
    <img src="${urlImagem}" alt="">
    <p>${titulo}</p>
    </div>
    <button id="acessarQuizz" onclick="acessarScreen2()">Acessar Quizz</button>
    <button id="voltarHome" onclick="voltarHome()">Voltar pra home</button>
    `
}

function validarCriacaoDasPerguntas() {
    let cont=0;
    dados.questions = [];

    for (i = 1; i <= qtdPerguntas; i++) {

        let textoPergunta = document.getElementById(`${i}pergunta`).value;
        let corFundo = document.getElementById(`${i}cor`).value;
        let respostaCorreta = document.getElementById(`${i}resposta`).value;
        let urlCorreta = document.getElementById(`${i}resposta-img`).value;
        let respostaIncorreta1 = document.getElementById(`${i}erro-1`).value;
        let urlIncorreta1 = document.getElementById(`${i}erro-1-img`).value;
        let respostaIncorreta2 = document.getElementById(`${i}erro-2`).value;
        let urlIncorreta2 = document.getElementById(`${i}erro-2-img`).value;
        let respostaIncorreta3 = document.getElementById(`${i}erro-3`).value;
        let urlIncorreta3 = document.getElementById(`${i}erro-3-img`).value;


        let objPerguntas = {
            title: textoPergunta,
            color: corFundo,
            answers: []
        }
        let objRespostaCorreta = {
            text: respostaCorreta,
            image: urlCorreta,
            isCorrectAnswer: true
        }
        let objRespostaIncorreta1 = {
            text: respostaIncorreta1,
            image: urlIncorreta1,
            isCorrectAnswer: false
        }
        let objRespostaIncorreta2 = {
            text: respostaIncorreta2,
            image: urlIncorreta2,
            isCorrectAnswer: false
        }
        let objRespostaIncorreta3 = {
            text: respostaIncorreta3,
            image: urlIncorreta3,
            isCorrectAnswer: false
        }

        const checkPergunta = (textoPergunta.length >= 20);
        const caracteresPermitidos = ['#', 'a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        const checkHex = ((corFundo[0] === '#') && (corFundo.split('').filter(letra => !caracteresPermitidos.includes(letra.toLowerCase())).length === 0));
        const inputCorreto = (respostaCorreta !== null);
        const inputErrado = (((respostaIncorreta1 !== null) && (urlIncorreta1 !== null)) || ((respostaIncorreta2 !== null) && (urlIncorreta2 !== null)) || ((respostaIncorreta3 !== null) && (urlIncorreta3 !== null)));

        if ((checkPergunta) && checkUrl(urlCorreta) && (checkHex) && (inputCorreto) && (inputErrado)) {

            objPerguntas.answers.push(objRespostaCorreta, objRespostaIncorreta1, objRespostaIncorreta2, objRespostaIncorreta3);

            dados.questions.push(objPerguntas);
            console.log("Dados:", dados.questions);
            cont++;
            console.log("Aumentou cont:");

        } else {
            alert(`Algo deu errado na pergunta ${i}! Por favor, preencha os dados corretamente.`);
        }
    }
    console.log("cont:");
    console.log(cont);
    console.log("perguntas:");
    console.log(qtdPerguntas);
    
    if(cont == qtdPerguntas){
        prosseguirParaNiveis();
        console.log("fui para nivel");
    }
    
}

function validarCriacaoDosNiveis() {
    let contador = 0;
    let algumNivelZero = false;
    let teveErro = false;

    dados.levels = [];

    for (i = 1; i <= qtdNiveis; i++) {
        let nivelTitulo = document.getElementById(`${i}nivel-titulo`).value;
        let nivelAcerto = Number(document.getElementById(`${i}nivel-acerto`).value);
        let nivelUrl = document.getElementById(`${i}nivel-url`).value;
        let nivelDescricao = document.getElementById(`${i}nivel-descricao`).value;

        let objNiveis = {
            title: nivelTitulo,
            image: nivelUrl,
            text: nivelDescricao,
            minValue: nivelAcerto
        }

        const checkNivel = (nivelTitulo.length >= 10);
        console.log("CheckNivel:", checkNivel);
        const checkPercentual = ((nivelAcerto >= 0) && (nivelAcerto <= 100));
        console.log("checkPercentual:", checkPercentual);
        const checkDescricao = (nivelDescricao.length >= 30);
        console.log("checkDescricao:", checkDescricao);
        const checkErrarTodas = (nivelAcerto === 0 || algumNivelZero);
        console.log("checkErrarTodas:", checkErrarTodas);
        if (nivelAcerto === 0) {
            algumNivelZero = true;
        }
        console.log("algumNivelZero:", algumNivelZero);
        if ((checkNivel) && (checkPercentual) && checkUrl(nivelUrl) && (checkDescricao) && (checkErrarTodas)) {
            console.log("check correto dos níveis");
            dados.levels.push(objNiveis);
            console.log("Objetos dos níveis:", objNiveis);
            contador++;
        } else {
            alert(`Algo deu errado no nível ${i}! Por favor, preencha os dados corretamente.`)
            teveErro = true;
        }
    }
    if (teveErro !== true) { //teveErro !== true
        console.log(dados);
        console.log("if ok",contador);
        //console.log("teste",teste);
        console.log("post dos dados:");
        const promisse = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", dados);
        console.log("depois do post esperando");
       // promisse.then(prosseguirParaFinalizacao);
          promisse.then(resposta => {
            console.log("Post concluído",resposta);
            //console,log(resposta.id);
            console.log(`Dados:${dados}`);

            prosseguirParaFinalizacao();
        })
        promisse.catch(erro => console.log("Houve um erro no post"));
    }
}

function prosseguirParaNiveis() {
    console.log("Cheguei nos niveis");
    document.querySelector('.screen-3-2').classList.add('hidden');
    document.querySelector('.screen-3-3').classList.remove('hidden');

    criarNiveis();
}

function prosseguirParaFinalizacao() {
    console.log("Cheguei finalização!!!!");
    document.querySelector('.screen-3-3').classList.add('hidden');
    document.querySelector('.screen-3-4').classList.remove('hidden');

    criarFinalizacao();
}

function abrirPergunta(i) {
    const abrir = document.querySelector(`.pergunta-${i}`);
    abrir.classList.toggle("hidden");
}

function abrirNivel(i) {
    const abrir = document.querySelector(`.nivel-${i}`);
    abrir.classList.toggle("hidden");
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
    document.querySelector(".screen-3-4").classList.add("hidden");
    document.querySelector(".screen-2").classList.remove("hidden");
}

function voltarHome(){
    window.location.reload();
}
function error() {
    alert("erro");
}


//Scripts-Gabriel---------------------------------------------------------------

mostrarQuizz()

function mostrarQuizz(){
  axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)
  .then(response => {
    console.log(response.data);
    document.querySelector('.titulo-quizz').innerHTML = `${response.data.title}`
    document.querySelector('.screen-2-1').innerHTML += `<img class="image-header" src="${response.data.image}">`
    perguntas = response.data.questions;
    mostrarPerguntas(response);
  })
  .catch(error => {
    alert('Ocorreu um erro ao selecionar o seu quizz. Por favor recarregue a página ou tente novamente')
  });
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
const quizzOnScreen = document.querySelector('.selected-quizz')
function mostrarPerguntas(response){
    
    for (let i = 0; i < perguntas.length; i++){
    let color = perguntas[i].color;
    quizzOnScreen.innerHTML += `
        <div class="question">
            <h2 class="question-title color${i}">${perguntas[i].title}</h2>
        </div>
        <div class="white-layer"></div>
      `
      alterarCor(i,color)
        shuffle(perguntas[i].answers);

      for (let j= 0; j < perguntas[i].answers.length; j++){
        let element = document.querySelectorAll('.question')
        element[i].innerHTML += `
        <div onclick="selecionarResposta${i}()" class="card-question q${i}">
        <img src=${perguntas[i].answers[j].image}>
        <p>${perguntas[i].answers[j].text}</p>
        </div>
        `
      }
  }
}


function selecionarResposta0() {
    let clicado = false;
    let optionsQuizz = document.querySelectorAll('.q0');
  
    optionsQuizz.forEach(function(opacity) {
      opacity.addEventListener('click', function() {
        if (!clicado) {
          clicado = true;
          optionsQuizz.forEach(function(removeOpacity) {
            removeOpacity.classList.add('apply-opacity');
            removeOpacity.style.pointerEvents = 'none';
          });
          opacity.classList.remove('apply-opacity');
        }
      });
    });
  }

function selecionarResposta1() {
    let clicado = false;
    let optionsQuizz = document.querySelectorAll('.q1');
  
    optionsQuizz.forEach(function(opacity) {
      opacity.addEventListener('click', function() {
        if (!clicado) {
          clicado = true;
          optionsQuizz.forEach(function(removeOpacity) {
            removeOpacity.classList.add('apply-opacity');
            removeOpacity.style.pointerEvents = 'none';
          });
          opacity.classList.remove('apply-opacity');
        }
      });
    });
  }
  

  function selecionarResposta2() {
    let clicado = false;
    let optionsQuizz = document.querySelectorAll('.q2');
  
    optionsQuizz.forEach(function(opacity) {
      opacity.addEventListener('click', function() {
        if (!clicado) {
          clicado = true;
          optionsQuizz.forEach(function(removeOpacity) {
            removeOpacity.classList.add('apply-opacity');
            removeOpacity.style.pointerEvents = 'none';
          });
          opacity.classList.remove('apply-opacity');
        }
      });
    });
  }

  function selecionarResposta3() {
    let clicado = false;
    let optionsQuizz = document.querySelectorAll('.q3');
  
    optionsQuizz.forEach(function(opacity) {
      opacity.addEventListener('click', function() {
        if (!clicado) {
          clicado = true;
          optionsQuizz.forEach(function(removeOpacity) {
            removeOpacity.classList.add('apply-opacity');
            removeOpacity.style.pointerEvents = 'none';
          });
          opacity.classList.remove('apply-opacity');
        }
      });
    });
  }

function alterarCor(elemento, cor){
    document.querySelector(`.color${elemento}`).style.backgroundColor = `${cor}`;
}

//Final-de-Scripts-Gabriel---------------------------------------------------------------