window.onload = function () {


    // Parte 1 do código - Trabalhando com a API DO CANVAS
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Váriavel de controle do desenho
    isDrawing = true;

    // Definindo o raio e a posição central do círculo
    const radius = 250;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Calculando o ângulo de cada parte do círculo
    const anglePerSecond = (2 * Math.PI) / 60;

    // Definindo o contador de segundos
    let secondsCircle = 0;

    // Função para desenhar uma parte do círculo
    function drawCirclePart() {
        // Verificar se o desenho ainda está em andamento
        if (!isDrawing) {
          return;
        }

        // Reiniciar o contador de segundos se chegarmos a 60 segundos
        if (secondsCircle === 60) {
            secondsCircle = 0;

            // Limpar o canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Calculando o ângulo atual
        const currentAngle = -Math.PI / 2 + secondsCircle * anglePerSecond;

        // Definindo a posição inicial e final da parte do círculo
        const startX = centerX + Math.cos(currentAngle) * radius;
        const startY = centerY + Math.sin(currentAngle) * radius;
        const endX = centerX + Math.cos(currentAngle + anglePerSecond) * radius;
        const endY = centerY + Math.sin(currentAngle + anglePerSecond) * radius;

        // Definindo a espessura da linha
        ctx.lineWidth = 2;

        // Desenhando a parte do círculo
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'orange';
        ctx.stroke();

        // Incrementando o contador de segundos
        secondsCircle++;

        // Verificando se ainda não chegamos a 60 segundos
        if (secondsCircle <= 60) {
            // Agendando a próxima parte do círculo após 1 segundo
            setTimeout(drawCirclePart, 1010);
        }
    }


    // Parte 2 do código - Toda lógica relacionada ao CRONÔMETRO

    var seconds = 00;
    var tens = 00;
    var minutes = 00;

    // Pegando os elementos no DOM
    var appendMinutes = document.getElementById("minutes")
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById("button-start")
    var buttonStop = document.getElementById("button-stop")
    var buttonReset = document.getElementById("button-reset")
    var Interval;

    // Lógica do botão de Start - Começar cronômetro

    buttonStart.onclick = function () {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
        isDrawing = true;
        drawCirclePart();
    }

    // Lógica do botão Stop - Parar cronômetro

    buttonStop.onclick = function () {
        clearInterval(Interval);
        isDrawing = false;
    }

    // Lógica do botão Reset - Para zerar o cronômetro
    buttonReset.onclick = function () {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        minutes = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        appendMinutes.innerHTML = minutes;

        secondsCircle = 0;
        // Limpar o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isDrawing = false;
    }

    // Lógica da contagem dos milisegundos, segundos e minutos
    function startTimer() {

        // Começa a contagem de milisegundos
        tens++;

        if (tens <= 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;
        }

        if (tens > 99) {
            console.log("seconds")
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }

        if (seconds > 59) {
            appendSeconds.innerHTML = "0" + 0;
            seconds = 0;

            minutes++;
            appendMinutes.innerHTML = "0" + minutes;
        }

    }
}