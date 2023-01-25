
// Scripts Guilherme ----------------------------------------------------------

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
        console.log(document.querySelector(".screen-3-1"));
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

function checkUrl(str) {
    var a = document.createElement('a');
    a.href = str;
    return (a.host && a.host != window.location.host);
}

// Final de Scripts Guilherme -------------------------------------------------