<template>
  <div
v-show="showRightSideWorkSpace"
    id="rightsidecontainer"
    class="vfire relative"
    style="display: block;"
    :style="'width:'+rigthSideWorkSpaceWidth+'%'"
  >
    <div class="absolute all-0 flex" :style="'padding-left:'+[showLeftSideWorkSpace?12:0]+'px'">
      <div class="flex flex-auto flex-column relative">
        <div
          class="overflow-hidden relative flex-auto white rounded-big-top-left"
        >
          <div class="flex flex-column absolute all-0">
            <div
              class="flex-none flex items-center border-bottom-thick border-darken2 px2"
              style="height: 46px"
            >
              <div class="flex-auto flex items-center mr2">
                <h5><strong>Right Side Workspace</strong></h5>
              </div>
              <div class="flex-none flex items-center">
                
              </div>
            </div>
            <div
              class="flex flex-column flex-auto light-scrollbar pb1"
              style="overflow: hidden auto; z-index: 0"
            >
            
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute top-0 left-0 bottom-0 flex items-center"
      style="cursor: ew-resize; width: 12px"
      v-show="showLeftSideWorkSpace"
      @drag="setWorkSpaceWidthValue"
    >
      <div
        class="col-12 flex flex-column items-center quiet"
        style="height: 40px"   @drag="setWorkSpaceWidthValue"
      >
        <div class="white circle" style="width: 3px; height: 3px"></div>
        <div class="white circle my-half" style="width: 3px; height: 3px"></div>
        <div class="white circle" style="width: 3px; height: 3px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['rigthSideWorkSpaceWidth','showRightSideWorkSpace','showLeftSideWorkSpace'])
    },
    methods: {
        setWorkSpaceWidthValue(event){
            var dragvalue =  event.clientX;
            this.$store.commit('SET_WORKSPACE_WIDTH',dragvalue);
        }
    },
}
</script>