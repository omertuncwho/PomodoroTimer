let timer;
let minutes;
let seconds;
let isRunning = false;
let isBreak = false;

function startTimer() {
    if (!isRunning) {
        minutes = parseInt(document.getElementById('pomodoroTime').value);
        seconds = 0;
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
        document.getElementById('startButton').innerText = 'Pause';
    } else {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startButton').innerText = 'Resume';
    }
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        isRunning = false;
        if (!isBreak) {
            prepareForBreak();
        } else {
            document.getElementById('timerDisplay').innerText = 'Time\'s up!';
            document.getElementById('startButton').innerText = 'Start';
        }
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

// Sends to the title
        document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - Pomodoro Timer`;

        document.getElementById('timerDisplay').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isBreak = false;
    document.getElementById('pomodoroTime').disabled = false;
    document.getElementById('breakTime').disabled = false;
    document.getElementById('timerDisplay').innerText = `${String(document.getElementById('pomodoroTime').value).padStart(2, '0')}:00`;
    document.getElementById('startButton').innerText = 'Start';

    // Resets the title
    document.title = 'Pomodoro Timer';
}

function prepareForBreak() {
    isBreak = true;
    minutes = parseInt(document.getElementById('breakTime').value);
    seconds = 0;
    document.getElementById('timerDisplay').innerText = 'Break time!';
    document.getElementById('pomodoroTime').disabled = true;
    document.getElementById('breakTime').disabled = true;
    timer = setInterval(updateTimer, 1000);
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
