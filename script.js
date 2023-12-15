const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const titulo = document.querySelector('.app__title');
const banner = document.querySelector('.app__image')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause');
const comecaPausar = document.querySelector('#start-pause span');
const audioControl = document.querySelector(".app__card-primary-butto-icon")
const timer = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
const musicaIniciar = new Audio('/sons/play.wav')
const musicaPause = new Audio('/sons/pause.mp3')
const musicaFim = new Audio('/sons/beep.mp3')
musica.loop = true

let temporizador = 1500;
let intervaloId;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


function alterarContexto(contexto) {
    ExibirTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

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
        Hora de voltar a superficie.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `
            break;

        default:
            break;
    }
}

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

startPauseBt.addEventListener('click', iniciarOuPause)

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

function zerar() {
    clearInterval(intervaloId)
    comecaPausar.textContent = "Começar"
    intervaloId = null
}

function ExibirTempo () {
    const tempo = new Date(temporizador * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}

ExibirTempo()