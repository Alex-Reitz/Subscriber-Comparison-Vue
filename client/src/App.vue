<template>
  <main class="container">
    <h1 class="title">
      <strong>PewDiePie</strong> vs
      <strong>TSeries</strong>
    </h1>
    <div class="card-container">
      <div class="card">
        <img
          src="https://yt3.ggpht.com/a/AGF-l79FVckie4j9WT-4cEW6iu3gPd4GivQf_XNSWg=s288-mo-c-c0xffffffff-rj-k-no
"
          class="channel-img"
        >
        <h2 class="card-title">PewDiePie</h2>
        <animated-number
          class="number"
          :value="pewdiepieStats.subscriberCount"
          :formatValue="formatCount"
          :duration="duration"
        />
      </div>
      <div class="card">
        <img
          src="https://yt3.ggpht.com/a/AGF-l7_pAUMBrwUj9lIAPzwKL1MKmb9q875ck73n2Q=s288-mo-c-c0xffffffff-rj-k-no
"
          class="channel-img"
        >
        <h2 class="card-title">TSeries</h2>
        <animated-number
          class="number"
          :value="tseriesStats.subscriberCount"
          :formatValue="formatCount"
          :duration="duration"
        />
      </div>
    </div>
    <div class="diff">
      <animated-number
        class="number"
        :value="subDifference"
        :formatValue="formatCount"
        :duration="duration"
      />
      <p style="margin: 0">Sub Difference</p>
    </div>
  </main>
</template>

<script>
import io from "socket.io-client";
import AnimatedNumber from "animated-number-vue";
export default {
  components: { AnimatedNumber },
  data: () => ({
    pewdiepieStats: {},
    tseriesStats: {},
    duration: 1000
  }),
  async mounted() {
    const API_ENDPOINT = "http://localhost:4444/stats";
    const res = await fetch(API_ENDPOINT);
    const { pewdiepieStats, tseriesStats } = await res.json();
    this.pewdiepieStats = pewdiepieStats;
    this.tseriesStats = tseriesStats;
    const socket = io("http://localhost:4444");
    socket.on("stats", ({ pewdiepieStats, tseriesStats }) => {
      this.pewdiepieStats = pewdiepieStats;
      this.tseriesStats = tseriesStats;
    });
  },
  computed: {
    subDifference() {
      return (
        this.tseriesStats.subscriberCount - this.pewdiepieStats.subscriberCount
      );
    }
  },
  methods: {
    formatCount(value) {
      return Number(value.toFixed(0)).toLocaleString();
    }
  }
};
</script>


<style>
@import url("http://fonts.googleapis.com/css?family=Roboto");
html,
body {
  font-family: "Roboto", sans-serif;
  background: linear-gradient(to right, orangered 0%, indigo 100%);
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10vh 0;
}
.card-container {
  display: flex;
}
.number {
  font-size: 40px;
  margin-right: 5px;
}
.title {
  font-weight: 100;
  font-size: 50px;
  color: white;
  margin: 0;
}
.card-title {
  margin: 0;
  font-size: 40px;
}
.channel-img {
  height: 120px;
  width: 100px;
  object-fit: cover;
  border-radius: 10px;
}
.card {
  display: grid;
  align-items: center;
  justify-items: center;
  height: 300px;
  width: 300px;
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1);
}
.diff {
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  color: purple;
}
</style>

