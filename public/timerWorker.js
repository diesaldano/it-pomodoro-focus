// public/timerWorker.js

let count = 0;
let running = false;

onmessage = function (e) {
  if (e.data === 'start') {
    running = true;
    runTimer();
  } else if (e.data === 'stop') {
    running = false;
  } else if (e.data === 'reset') {
    count = 0;
  }
};

function runTimer() {
  setTimeout(() => {
    if (running) {
      count++;
      postMessage(count);
      runTimer();
    }
  }, 1000);
}