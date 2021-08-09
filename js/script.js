const URL_CHAT = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants";
const URL_CONVERSA = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages";
const URL_MANTER = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status";
let nome;
let mensagem;
let mensagens = [];
let lastOne;
let primeiraVez = 0;
let ultimoAnterior = "";
let proximoBool = false;
//comecando a cuidar dos participantes

function inputNome() {
    nome = prompt("Qual seu nome?");
    let nameEntra = {
        name: nome
    };
    colocarNome(nameEntra);
}

inputNome();
function colocarNome(nameEntra) {
    const promessa = axios.post(URL_CHAT, nameEntra);
    promessa.then(pegarNomes);   
    promessa.catch(voltaPedirNome);
}
function voltaPedirNome(error){
    alert("Escreva outro nome");
    inputNome();
}

function pegarNomes(resposta) {
    const promessa = axios.get(URL_CHAT);
    promessa.then();
    inputMensagem();
}

//terminando a cuidar dos participantes

//comecando cuidar das mensagens
function inputMensagem() {
    mensagem = document.querySelector("input").value;
    document.querySelector("input").value = "";
    if (mensagem.length > 0) {
        console.log(mensagem);
        let mensagemEntre = {
            from: nome,
            to: "Todos",
            text: mensagem,
            type: "message",
            time: ""
        };
        
        colocarMensagem(mensagemEntre);
    } else {
        pegarMensagem();
    }
}

function colocarMensagem(mensagemEntre) {
    const promessa = axios.post(URL_CONVERSA, mensagemEntre);
    promessa.then(pegarMensagem);
    promessa.catch(recarregarPagina);
}

function recarregarPagina(){
    alert("Você saiu da sala e é necessario colocar novamente o nome");
    window.location.reload();
}

function pegarMensagem() {
    const promessa = axios.get(URL_CONVERSA);
    promessa.then(carregarMensagem);
}

function carregarMensagem(resposta) {
    mensagens = resposta.data;
    //console.log(mensagens);
    renderizarMensagens();
}
//terminando cuidar das mensagens

function renderizarMensagens() {
    let divConversas = document.querySelector(".conversa");
    divConversas.innerHTML = "";
    let ultimoBool = false;

    if (ultimoAnterior === mensagens[mensagens.length - 1].time && proximoBool === false) {
        ultimoBool = true;
        proximoBool = true;
    }
    let nessaRodada = ultimoAnterior;
    for (let i = 0; i < mensagens.length; i++) {

        if (mensagens[i].type === "status") {
            if (i === mensagens.length - 1) {

                lastOne = `<div class="entrou ultimo">
                <p>(${mensagens[i].time}) <strong>${mensagens[i].from}</strong> ${mensagens[i].text} </p>
                </div>`;
                
                divConversas.innerHTML += lastOne;
                ultimoAnterior = mensagens[i].time;
            } else {

                divConversas.innerHTML += `<div class="entrou">
            <p>(${mensagens[i].time}) <strong>${mensagens[i].from}</strong> ${mensagens[i].text} </p>
            </div>`;

            }
        }

        if (mensagens[i].type === "message") {
            if (i === mensagens.length - 1) {

                lastOne = `<div class="mensagem-comum ultimo">
                <p>(${mensagens[i].time})  <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>:  ${mensagens[i].text}</p>
                </div>`;

                divConversas.innerHTML += lastOne;

                ultimoAnterior = mensagens[i].time;
            } else {

                divConversas.innerHTML += `<div class="mensagem-comum">
            <p>(${mensagens[i].time})  <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong>:  ${mensagens[i].text}</p>
        </div>`;

            }


        }

        if (mensagens[i].type === "private_message" && mensagens[i].to === nome) {
            if (i === mensagens.length - 1) {

                lastOne = `<div class="reservadamente ultimo">
                <p>(${mensagens[i].time})  <strong>${mensagens[i].from}</strong> reservadamente para <strong>${mensagens[i].to}</strong>:  ${mensagens[i].text}</p>
            </div>`;

                divConversas.innerHTML += lastOne
                ultimoAnterior = mensagens[i].time;

            } else {

                divConversas.innerHTML += `<div class="reservadamente">
            <p>(${mensagens[i].time})  <strong>${mensagens[i].from}</strong> reservadamente para <strong>${mensagens[i].to}</strong>:  ${mensagens[i].text}</p>
        </div>`;

            }
        }


    }
    //faz aki
    if(ultimoAnterior === nessaRodada){
        proximoBool = true;
    }else{
        proximoBool = false;
    }

    if(ultimoBool && proximoBool){
        let divUltimo = document.querySelector(".ultimo");
        divUltimo.scrollIntoView();
    }
    if(primeiraVez === 0){
        let divUltimo1 = document.querySelector(".ultimo");
        divUltimo1.scrollIntoView();
    }
    
    primeiraVez++;

}

setInterval(pegarMensagem, 3000);

//Manter conexao
function inputManterConexao() {
    let nameEntra = {
        name: nome
    };
    manterConexao(nameEntra);
}

function manterConexao(nameEntra) {
    const promessa = axios.post(URL_MANTER, nameEntra);
    promessa.then();
}

setInterval(inputManterConexao, 5000);
//Fim de manter Conexao