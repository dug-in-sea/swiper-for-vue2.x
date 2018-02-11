<template lang="pug">
div#app
  Swiper.swiper-body(direction= "horizontal",
        :noAnimation = "false",
        :loop = "true",
        :paginationVisible = "true",
        :paginationClickable = "true"
        ref = "swiper"
        @pageChange = "pageChange",
        ) 
    div.swiper-item(v-for = "(item, index) in picList" 
    :class = "{on : index + 1 == current_page, off: index + 1 != current_page }") 
      img(:src = "item.pic")
      h3.d-both-center {{index + 1}}
</template>

<style lang = "scss">
@import "./common.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.swiper-body {
  position: relative;
}
.swiper-item {
  position: relative;
  transform: translate(22%, 0);
  img{
    width:80%;
    margin: 0 auto;
    display: block;
  }
  &.on {
    img {
      width: 100%;
    }
  }
  &.off {
    img {
      width:80%;
      margin:0.2rem auto;
    }
  }
}
</style>


<script>
import Swiper from "./components/vue-swiper/index.vue"; 
import Bigo from "bigoapi";
import tool from "./tool.js";
import eruda from "eruda";

eruda.init();
export default {
  data() {
    return {
      current_page : 1,
      picList: [
        {pic: require("./assets/p1.png")},
        {pic: require("./assets/p2.png")},
        {pic: require("./assets/p3.png")},
        {pic: require("./assets/p4.png")},
        {pic: require("./assets/p5.png")},
      ],
    };
  },
  computed: {
  },
  methods: {
    pageChange(index) {
       this.current_page = index;
    }
  },
  created() {
    tool.htmlRemInit();
  },
  mounted() {
  },
  components: {
     Swiper,
  },
};
</script>

