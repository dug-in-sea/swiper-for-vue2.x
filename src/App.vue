<template lang="pug">
  div#app
    img(src="./assets/logo.png")
    section.select 
      button.select-item Good 
      button.select-item Nice
    router-view
    img(src="./assets/logo.png")
    img(src="./assets/logo.png")
    img(src="./assets/logo.png")
</template>

<script>
export default {
  data() {
    return {
      name: 'app',
      img_temp: [require("./assets/1.jpg"),
                  require("./assets/2.jpg")],
    };
  },
  mounted() {
    var dest = document.querySelector(".select");
    var originOffsetY = dest.offsetTop; 
    function onScroll(e) {
      window.scrollY >= originOffsetY + 1 ? dest.classList.add("sticky") : dest.classList.remove("sticky");
    }
    window.addEventListener("scroll", onScroll);
  },
}
</script>

<style>
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
