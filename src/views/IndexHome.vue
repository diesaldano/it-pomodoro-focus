<template>
  <div
    class="row"
    :class="`pomodoro ${
      currentTab === 'work'
        ? 'work-time'
        : currentTab === 'short'
        ? 'short-time'
        : 'long-time'
    }`"
  >
    <div class="col-4 card p-5 text-center d-block mx-auto shadow p-3 mb-5 rounded">
      <!-- Pestañas para los diferentes tiempos -->
      <ul class="nav nav-tabs">
        <li class="nav-item" style="cursor: pointer;">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'work' }"
            @click="selectTab('work')"
            >Work Time</a
          >
        </li>
        <li class="nav-item " style="cursor: pointer;">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'short' }"
            @click="selectTab('short')"
            >Short Break</a
          >
        </li>
        <li class="nav-item" style="cursor: pointer;">
          <a
            class="nav-link"
            :class="{ active: currentTab === 'long' }"
            @click="selectTab('long')"
            >Long Break</a
          >
        </li>
      </ul>

      <!-- Indicador de carga (Spinner) -->
      <div
        v-if="isLoading"
        class="spinner-border text-primary text-center"
        style="height: 200px"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>

      <div v-else>
        <!-- Título y temporizador -->
        <h1 class="pt-4 display-10">{{ capitalizedCurrentTab }} Time</h1>

        <div class="timer">
          {{ formattedTime }}
        </div>

        <!-- Botones de control -->
        <div class="mt-4">
          <button
            class="btn btn-primary btn-lg me-2"
            @click="toggleTimer"
            :disabled="isLoading"
          >
            <i :class="isRunning ? 'pi pi-pause' : 'pi pi-play'"></i>
          </button>
          <button
            class="btn btn-danger btn-lg me-2"
            @click="resetTimer"
            :disabled="isLoading"
          >
            <i class="pi pi-refresh"></i>
          </button>
          <button class="btn btn-warning btn-lg" @click="testAlarm">
            <i class="pi pi-volume-up"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { useRouter } from 'vue-router';
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

export default {
  name: "PomodoroTimer",
  setup() {
    const workTime = 25 * 60;
    const shortBreakTime = 5 * 60;
    const longBreakTime = 15 * 60;
    const currentTab = ref("work");
    const timer = ref(workTime);
    const isRunning = ref(false);
    const isLoading = ref(false);
    const router = useRouter();

    const alarm = new Audio("./alarm.mp3");

    let timeWorker;

    const selectTab = (tab) => {
      currentTab.value = tab;
      resetTimer();
    };

    const capitalizedCurrentTab = computed(() => {
      return (
        currentTab.value.charAt(0).toUpperCase() + currentTab.value.slice(1)
      );
    });

    const getInitialTime = () => {
      switch (currentTab.value) {
        case "work":
          return workTime;
        case "short":
          return shortBreakTime;
        case "long":
          return longBreakTime;
      }
    };

    const resetTimer = () => {
      isLoading.value = true;
      timeWorker.postMessage('stop');
      timer.value = getInitialTime();
      timeWorker.postMessage('reset');
      isRunning.value = false;
      isLoading.value = false;
    };

    const stopTimer = () => {
      timeWorker.postMessage('stop');
    };

    const toggleTimer = () => {
      if (isRunning.value) {
        timeWorker.postMessage('stop');
      } else {
        timeWorker.postMessage('start');
      }
      isRunning.value = !isRunning.value;
      isLoading.value = false; 
    };

    watch(timer, (newValue) => {
      if (newValue === 0) {
        alarm.play();
      }
    });

    const formattedTime = computed(() => {
      const minutes = Math.floor(timer.value / 60);
      const seconds = timer.value % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    });

    const testAlarm = () => {
      if (!alarm.paused) {
        alarm.pause(); // Esto detendrá el sonido si está sonando.
        alarm.currentTime = 0; // Esto reinicia el audio al comienzo para una futura reproducción.
      } else {
        alarm.play(); // Esto reproducirá el sonido si está detenido.
      }
    };

    onMounted(() => {
      timeWorker = new Worker('./timerWorker.js');
      timeWorker.onmessage = (e) => {
        timer.value = getInitialTime() - e.data;
        if (timer.value <= 0) {
          stopTimer();
          alarm.play();
        }
      }
    });

    onUnmounted(() => {
      // stopTimer();
      timeWorker.terminate();
    });

    return {
      currentTab,
      timer,
      isRunning,
      toggleTimer,
      resetTimer,
      formattedTime,
      isLoading,
      capitalizedCurrentTab,
      selectTab,
      testAlarm,
    };
  },
};
</script>
<style scoped>
.pomodoro {
  min-height: 100vh; /* 100% de la altura de la vista */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0; /* Remover márgenes predeterminados */
  padding: 0; /* Remover rellenos predeterminados */
  overflow: hidden; /* Ocultar desbordamiento */
  transition: background-color 0.3s;
}

.work-time {
  background: #f85032; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #e73827,
    #f85032
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e73827,
    #f85032
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.long-time {
  background: #aaffa9; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #11ffbd,
    #aaffa9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #11ffbd,
    #aaffa9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.short-time {
  background: #1d976c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #93f9b9,
    #1d976c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #93f9b9,
    #1d976c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.timer {
  font-size: 5rem;
  font-weight: bold;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
}
</style>
