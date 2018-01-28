<template lang="pug">
div#app
  swiper(v-ref = "swiper"
        direction="horizontal"
        :mousewheel-control="true"
        :performance-mode="false"
         :pagination-visible="true"
         :pagination-clickable="true"
         :loop="true"
         @slide-change-start="onSlideChangeStart"
         @slide-change-end="onSlideChangeEnd")
    div page1
    div page1
    div page1
</template>

<script>
import swiper from "./components/vue-swiper/index.vue"; 
export default {
  data() {
    return {

    };
  },
  mounted() {

  },
  components: {
     swiper,
  }
};
</script>

<style lang = "scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.selet {
  position: sticky;
  top:0;
}
.sticky {
  position: fixed;
  left:50%;
  transform: translate(-50%,0); 
  top:0;
}
</style>
