<template>
  <div class="row year-time pomodoro">
    <div
      class="col-6 card p-5 text-center d-block mx-auto shadow p-3 mb-5 rounded"
    >
      <h1 id="headline">Progresive year</h1>
      <div id="countdown">
        <ul class="list-unstyled">
          <li>
            <span id="days">{{ timeLeft.days }}</span> Days
          </li>
          <li>
            <span id="hours">{{ timeLeft.hours }}</span> Hours
          </li>
          <li>
            <span id="minutes">{{ timeLeft.minutes }}</span> Minutes
          </li>
          <li>
            <span id="seconds">{{ timeLeft.seconds }}</span> Seconds
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "IndexCountDown",
  setup() {
    const timeLeft = ref({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

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

    onMounted(updateCountdown);

    onUnmounted(() => {
      clearInterval(countdownInterval);
    });

    return {
      timeLeft,
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
  font-size: 2rem;
  text-align: center;
  margin: 0 10px;
}

#countdown ul li span {
  display: block;
  font-size: 4.5rem;
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
