<template>
  <div id="app">
    <top-navbar></top-navbar>
    <div id="applicationContainer">
      <right-side-work-space-control></right-side-work-space-control>
      <left-side-work-space></left-side-work-space>
      <right-side-work-space></right-side-work-space>
    </div>
  </div>
</template>

<script>
import topNavbar from "./components/partials/topnavbar";
import leftSideWorkSpace from "./components/leftsideworkspace";
import rightSideWorkSpace from "./components/rightsideworkspace";
import rightSideWorkSpaceControl from "./components/rightsideworkspacecontrol";

import { mapState } from "vuex";

export default {
  components: {
    topNavbar,
    leftSideWorkSpace,
    rightSideWorkSpace,
    rightSideWorkSpaceControl,
  },

  computed: {
    ...mapState(["showLeftSideWorkSpace"]),
  },

  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler(e) {
      // var winWith = e.target.innerWidth;

      // if (!this.showLeftSideWorkSpace) {
      //   this.$store.commit("SET_RIGHT_LEFT_PANEL_VALUE", {
      //     l: 100,
      //     r: 0,
      //     s:0
      //   });
      // } else {
      //   this.$store.commit("SET_RIGHT_LEFT_PANEL_VALUE", {
      //     l: 0,
      //     r: 100,
      //     s:1
      //   });
      // }

      // console.log(winWith);

    },
  },
};
</script>


