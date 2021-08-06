const URL_CHAT = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants";
const URL_CONVERSA = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages";
let nome;
let mensagem;
//comecando a cuidar dos participantes

function inputNome(){
    nome = prompt("Qual seu nome?");
    let nameEntra = {
        name: nome
    };
    colocarNome(nameEntra);
}

inputNome();
function colocarNome(nameEntra){
    const promessa = axios.post(URL_CHAT, nameEntra);
    promessa.then(pegarNomes);
}

function pegarNomes(resposta){
    const promessa = axios.get(URL_CHAT);
    promessa.then(console.log);
}

//terminando a cuidar dos participantes

//comecando cuidar das mensagens
function inputMensagem(){
    mensagem = document.querySelector("input").value;
    console.log(mensagem);
    let mensagemEntre = {
        from: nome,
        to: "Todos",
        text: mensagem, //mensagem
        type: "message",
        time: "08:02:50"
    };
    mensagem = " ";
    colocarMensagem(mensagemEntre);
}

function colocarMensagem(mensagemEntre){
    const promessa = axios.post(URL_CONVERSA, mensagemEntre);
    promessa.then(pegarMensagem);
}

function pegarMensagem(){
    const promessa = axios.get(URL_CONVERSA);
    promessa.then(console.log);
}
//terminando cuidar das mensagens