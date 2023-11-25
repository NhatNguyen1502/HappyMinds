let time_enable = 10000;
let index = 0;
document.addEventListener('DOMContentLoaded', () => {
    let video = document.getElementById('video');
    document.getElementById('timer').textContent = `00 : ${video.getAttribute(
        'data-duration',
    )}`;
    document.getElementById('rep').textContent = video.getAttribute('data-rep');

    const countupElement = document.getElementById('time_start');
    const countRestElement = document.getElementById('rest');
    let minutes = 0;
    let seconds = 0;
    let secondRest = 3;
    function updateCountup() {
        seconds++;
        const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        countupElement.textContent = `${minutesDisplay} : ${secondsDisplay}`;
        if (seconds == 59) {
            seconds = -1;
            minutes++;
        }
    }
    function updateCountdown() {
        secondRest--;
        const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
        const secondsDisplay = secondRest < 10 ? `0${secondRest}` : secondRest;
        countRestElement.textContent = `${minutesDisplay} : ${secondsDisplay}`;
        if (secondRest == 0) {
            clearInterval(timer2);
            let button = document.getElementById('start');
            button.removeAttribute('disabled');
            button.classList.add('shake');
        }
    }
    const timer1 = setInterval(updateCountup, 1000);
    const timer2 = setInterval(updateCountdown, 1000);

    setTimeout(enableNextButton, time_enable);
});

function nextVideo() {
    $('#carouselExampleControls').carousel('next');
    index++;
    if (index == 9) {
        document.getElementById('next').setAttribute('disabled', 'true');
        document.getElementById('skip').setAttribute('disabled', 'true');
        document.getElementById('start').textContent = 'FINISH!!!';
    } else {
        let newVideo = document.querySelector(`.video[data-index="${index}"]`);
        if (!newVideo) {
            index = 0;
            newVideo = document.querySelector('.carousel-item[data-index="0"]');
        }
        let calories =
            parseInt(document.getElementById('calories').innerHTML) +
            parseInt(newVideo.getAttribute('data-calo'));
        document.getElementById('calories').innerHTML = calories;
        document.getElementById(
            'timer',
        ).textContent = `00 : ${newVideo.getAttribute('data-duration')}`;
        document.getElementById('rep').textContent = parseInt(
            newVideo.getAttribute('data-rep'),
        );
        document.getElementById('next').setAttribute('disabled', 'true');
        time_enable = 10000;
        setTimeout(enableNextButton, time_enable);
    }
}

function skipVideo() {
    $('#carouselExampleControls').carousel('next');
    index++;
    if (index == 9) {
        document.getElementById('next').setAttribute('disabled', 'true');
        document.getElementById('skip').setAttribute('disabled', 'true');
        document.getElementById('start').textContent = 'FINISH!!!';
    } else {
        let newVideo = document.querySelector(`.video[data-index="${index}"]`);
        if (!newVideo) {
            index = 0;
            newVideo = document.querySelector('.carousel-item[data-index="0"]');
        }
        // let calories = parseInt(document.getElementById('calories').innerHTML) + parseInt(newVideo.getAttribute('data-calo'));
        // document.getElementById('calories').innerHTML = calories;
        document.getElementById(
            'timer',
        ).textContent = `00 : ${newVideo.getAttribute('data-duration')}`;
        document.getElementById('rep').textContent = parseInt(
            newVideo.getAttribute('data-rep'),
        );
        document.getElementById('next').setAttribute('disabled', 'true');
        time_enable = 10000;
        setTimeout(enableNextButton, time_enable);
    }
}

function enableNextButton() {
    document.getElementById('next').removeAttribute('disabled');
}

function runTimer() {
    const countTimerElement = document.getElementById('timer');
    let seconds = parseInt(countTimerElement.textContent.slice(5, 7));
    console.log(seconds);
    function updateCountdown() {
        seconds--;
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        countTimerElement.textContent = `00 : ${secondsDisplay}`;
        if (seconds <= 0) {
            clearInterval(timer3);
            document.getElementById('start').setAttribute('disabled', 'true');
            document.getElementById('next').classList.add('shake');
        }
    }
    const timer3 = setInterval(updateCountdown, 1000);
}
