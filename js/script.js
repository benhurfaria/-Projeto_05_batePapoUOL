const URL_CHAT = "https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants";
const URL_CONVERSA = "https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages";
let nome;

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

