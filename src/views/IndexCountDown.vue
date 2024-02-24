<template>
  <div class="row year-time pomodoro">
    <div
      class="col-6 card p-5 text-center d-block mx-auto shadow p-3 mb-5 rounded"
    >
      <hr />
      <div id="countdown">
        <ul class="list-unstyled">
          <li>
            <span id="days">{{ timeLeft.days }}</span>
            <p
              style="
                font-size: 1.5rem;
                position: relative;
                top: -10px;
                font-weight: 400;
              "
            >
              Days
            </p>
          </li>
          <li>
            <span id="hours">{{ timeLeft.hours }}</span>
            <p
              style="
                font-size: 1.5rem;
                position: relative;
                top: -10px;
                font-weight: 400;
              "
            >
              Hours
            </p>
          </li>
          <li>
            <span id="minutes">{{ timeLeft.minutes }}</span>
            <p
              style="
                font-size: 1.5rem;
                position: relative;
                top: -10px;
                font-weight: 400;
              "
            >
              Minutes
            </p>
          </li>
          <li>
            <span id="seconds">{{ timeLeft.seconds }}</span>
            <p
              style="
                font-size: 1.5rem;
                position: relative;
                top: -10px;
                font-weight: 400;
              "
            >
              Seconds
            </p>
          </li>
        </ul>
      </div>
      <hr />
      <ProgressBar 
        :value="progress.toFixed(2)"
        :style="{ height: '20px', color: 'black', margin: '3em auto 0em', width: '100%' }"
      />
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import { differenceInDays } from 'date-fns';

export default {
  name: "IndexCountDown",
  setup() {
    const timeLeft = ref({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    const progress = ref(0);

    const calculateProgress = () => {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      const endOfYear = new Date(new Date().getFullYear() + 1, 0, 1);
      const today = new Date();
      const daysInYear = differenceInDays(endOfYear, startOfYear);
      const daysPassed = differenceInDays(today, startOfYear);
      const progressPercentage = (daysPassed / daysInYear) * 100;
      progress.value = progressPercentage;
    };

    const updateCountdown = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const diff = newYear - now;

      timeLeft.value.days = Math.floor(diff / (1000 * 60 * 60 * 24));
      timeLeft.value.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      timeLeft.value.minutes = Math.floor((diff / 1000 / 60) % 60);
      timeLeft.value.seconds = Math.floor((diff / 1000) % 60);
    };

    const countdownInterval = setInterval(updateCountdown, 1000);

    onMounted(() => {
      updateCountdown();
      calculateProgress();
    });

    onUnmounted(() => {
      clearInterval(countdownInterval);
    });

    return {
      timeLeft,
      progress,
    };
  },
};
</script>
<style scoped>
#countdown ul {
  padding: 0;
  list-style: none;
}

#countdown ul li {
  display: inline-block;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin: 0 20px;
}

#countdown ul li span {
  display: block;
  font-size: 5rem;
}

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

.year-time {
  background: #fdc830; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #f37335,
    #fdc830
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #f37335,
    #fdc830
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
