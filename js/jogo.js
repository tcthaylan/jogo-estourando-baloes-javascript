timerId = null; //variável que armazena a chamada da função timeout

function iniciaJogo(){
    alert('jogo iniciado!');
    
    //Capturando o nível do jogo
    var url = window.location.search;
    var nivel_jogo = url.replace("?", "");
    
    
    //Inserindo tempo no cronometro
    var tempo_segundos = 0;
    switch(nivel_jogo){
            
        case '1'://Fácil
            tempo_segundos = 120; 
            break;
        
        case '2'://Normal
            tempo_segundos = 60;
            break;
            
        case '3'://Dicícil
            tempo_segundos = 30;
            break;
    }
    
    document.getElementById('cronometro_tempo').innerHTML = tempo_segundos;
    
    //Criando balões
    var qtde_baloes = 156;
    criaBaloes(qtde_baloes);
    
    //numerando baloes
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;
    
    //Contagem cronometro
    contagem_tempo(tempo_segundos + 1);
    
}

function contagem_tempo(tempo_segundos){
    
    tempo_segundos -= 1;
    
    if(tempo_segundos == -1){
        clearTimeout(timerId);
        game_over();
        return false;
    }
    
    document.getElementById('cronometro_tempo').innerHTML = tempo_segundos;
    
    timerId = setTimeout("contagem_tempo("+tempo_segundos+")", 1000);
}

function game_over(){
    
    alert('Fim de jogo, você não conseguiu estourar todos os balões.');
}

function criaBaloes(qtde_baloes){
    
    for(var i = 0; i < qtde_baloes; i++){
        
        var balao = document.createElement('img');
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.id = 'b' + i;
        balao.onclick = function(){ estourar(this); };
        
        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(balao){
    
    var id_balao = balao.id;
    
    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    
    pontuacao(-1);
}

function pontuacao(acao){
    
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
    
    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);
    
    baloes_inteiros += acao;
    baloes_estourados -= acao;
    
    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
    
    situacao_jogo(baloes_inteiros);
    
}

function situacao_jogo(baloes_inteiros){
    
    if(baloes_inteiros == 0){
        alert('Parabéns você conseguiu estourar todos os balões a tempo!');
        parar_tempo();
    }
}

function parar_tempo(){
    clearTimeout(timerId);
}