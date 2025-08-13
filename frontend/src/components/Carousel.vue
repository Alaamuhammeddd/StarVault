<script>
export default {
  name: "Carousel",
  mounted() {
    window.addEventListener(
      "resize",
      () => (this.screenWidth = window.innerWidth)
    );
    this.timer = setInterval(() => {
      this.incrementPosition();
    }, 5000);
    this.updateTimer = setInterval(() => {
      this.fetchData();
    }, 60000);
    this.fetchData();
  },
  methods: {
    incrementPosition() {
      this.position =
        this.position < this.items.length - 1 ? this.position + 1 : 0;
    },
    fetchData() {
      // Fetch data logic here
      console.log("Fetching data...");
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.updateTimer);
  },
};
</script>
