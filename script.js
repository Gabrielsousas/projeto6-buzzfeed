let guardaTodosQuizzes={};
pegaTodosQuizzesServidor();
function criarQuizz() {
    document.querySelector('.screen-1').classList.add('hidden');
    document.querySelector('.screen-3').classList.remove('hidden');
}

function pegaTodosQuizzesServidor(){
    const pegaTodosQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    pegaTodosQuizzes.then(listaTodosQuizzes);
    pegaTodosQuizzes.catch(error);
}

function listaTodosQuizzes(resposta){
    guardaTodosQuizzes={};
    guardaTodosQuizzes= resposta.data;
    const listaQuiz = document.querySelector('ul');
    listaQuiz.innerHTML = '';
    console.log(guardaTodosQuizzes);
    for(let i=0;i<guardaTodosQuizzes.length;i++){
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
function acessarScreen2(){
    alert("ok");
}
function error(){
    alert("erro");
}