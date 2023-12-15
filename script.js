// Seleciona o elemento HTML da página
const html = document.querySelector('html');

// Seleciona os botões de diferentes modos (foco, descanso curto, descanso longo)
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')

// Seleciona elementos adicionais da interface do usuário
const titulo = document.querySelector('.app__title');
const banner = document.querySelector('.app__image')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause');
const comecaPausar = document.querySelector('#start-pause span');
const audioControl = document.querySelector(".app__card-primary-butto-icon")
const timer = document.querySelector('#timer')

// Cria instâncias de objetos de áudio para diferentes eventos
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaIniciar = new Audio('/sons/play.wav')
const musicaPause = new Audio('/sons/pause.mp3')
const musicaFim = new Audio('/sons/beep.mp3')

// Configura a música para repetir continuamente (loop)
musica.loop = true

// Configuração inicial do temporizador e do identificador de intervalo
let temporizador = 1500;
let intervaloId;

// Adiciona um ouvinte de evento para alternar a reprodução da música ao alterar a caixa de seleção
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

// Função para alterar o contexto da aplicação e atualizar a interface do usuário
function alterarContexto(contexto) {
    ExibirTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    // Atualiza o título com base no contexto selecionado
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
        Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
            break;

        case 'descanso-curto':
            titulo.innerHTML = `
        Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
        `
            break;

        case 'descanso-longo':
            titulo.innerHTML = `
        Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `
            break;

        default:
            break;
    }
}

// Adiciona ouvintes de eventos aos botões para definir o temporizador e alterar o contexto
focoBt.addEventListener('click', () => {
    temporizador = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    temporizador = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    temporizador = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

// Função para a contagem regressiva
const contagemRegressiva = () => {
    if (temporizador <= 0) {
        musicaFim.play()
        alert('Tempo Finalizado')       
        zerar() 
        return;
    }
    temporizador -= 1
    ExibirTempo()
}

// Adiciona um ouvinte de evento ao botão iniciar/pausar
startPauseBt.addEventListener('click', iniciarOuPause)

// Função para iniciar ou pausar o temporizador
function iniciarOuPause() {
    if (intervaloId) {
        musicaPause.play()
        audioControl.setAttribute('src','/imagens/play_arrow.png')
        zerar()
        return
    } else {
        musicaIniciar.play()
        audioControl.setAttribute('src','/imagens/pause.png')
        intervaloId = setInterval(contagemRegressiva, 1000)
        comecaPausar.textContent = "Pausar"
    }
}

// Função para zerar o temporizador
function zerar() {
    clearInterval(intervaloId)
    comecaPausar.textContent = "Começar"
    intervaloId = null
}

// Função para exibir o tempo formatado na interface do usuário
function ExibirTempo () {
    const tempo = new Date(temporizador * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

// Chama a função ExibirTempo para exibir o tempo inicial na inicialização
ExibirTempo()
