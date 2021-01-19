<template>
  <div
    id="appControlsContainer"
    class="relative hide-print"
    style="width: 100%; display: block"
  >
    <div class="flex absolute left-0 right-0 vfire" style="top: 48px">
      <div class="flex vfire" style="display: inherit"         :style="'width:'+[showLeftSideWorkSpace?leftSideWorkSpaceWidth:rigthSideWorkSpaceWidth]+'%'"></div>
      <div class="flex vfire" :style="'width:'+[ showRightSideWorkSpace?rigthSideWorkSpaceWidth:leftSideWorkSpaceWidth]+'%'">
        <div
          class="relative flex-none width-full flex flex-column no-user-select"
          style="height: 30px"
        >
          <div class="flex-auto flex justify-between">
            <div class="flex" @click="openRightSideWorkSpace()">
              <div
                class="relative flex items-center"
                style="margin-left: 12px; margin-top: 0px"
              >
                <div
                  tabindex="0"
                  class="flex items-center pointer link-unquiet focus-visible-current-color focus-visible-opaque  text-white"  :class="showRightSideWorkSpace?'':'quiet'"
                  role="button"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    class="flex-none blocksOnboardingTipTarget"
                    style="shape-rendering: geometricprecision"
                  >
                    <path
                      fill-rule="evenodd"
                      fill="currentColor"
                      d="M1 14.01V9.99c0-.539.444-.99.99-.99h4.02c.539 0 .99.444.99.99v4.02c0 .54-.444.99-.99.99H1.99a.996.996 0 0 1-.99-.99zm0-9.76A3.252 3.252 0 0 1 4.25 1 3.252 3.252 0 0 1 7.5 4.25 3.252 3.252 0 0 1 4.25 7.5 3.252 3.252 0 0 1 1 4.25zm7.05 2.22L11 1.366c.276-.479.727-.478 1.007 0l2.986 5.104c.28.479.056.866-.5.866H8.557c-.556 0-.783-.388-.506-.866zm1.8 6.85L11.5 12l-1.65-1.32a1.083 1.083 0 0 1 1.353-1.693l2.708 2.167a1.083 1.083 0 0 1 0 1.692l-2.708 2.167a1.083 1.083 0 1 1-1.354-1.692z"
                    ></path>
                  </svg>
                  <div class="flex items-baseline">
                    <div class="caps small strong ml-half">Apps</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-none flex text-white" style="margin-top: 0px">
              <div
                tabindex="0"
                class="pointer ml2 flex items-center focus-visible-opaque focus-visible-opaque focus-container quiet link-unquiet"
                role="button"
                aria-label="Enable full screen side panel" v-show="showRightSideWorkSpace" @click="closeLeftSideWotkSpace()"
              >
                <div class="flex p-half  rounded  text-white" :class="!showLeftSideWorkSpace?'lighten3 ':''">
                 <svg width="12" height="12" viewBox="0 0 12 12" class="parent-focus-visible-current-color" style="shape-rendering: geometricprecision;"><path fill-rule="evenodd" fill="currentColor" d="M4 0H2C0.895431 0 0 0.895432 0 2V4H2V2H4V0Z M4 10.0154H2V8H0V10.0154C0 11.12 0.895431 12.0154 2 12.0154H4V10.0154Z M8 12.0154V10.0154H10V8H12V10.0154C12 11.12 11.1046 12.0154 10 12.0154H8Z M8 2V0H10C11.1046 0 12 0.895431 12 2V4H10V2H8Z M3.5 4.5C3.5 3.94772 3.94772 3.5 4.5 3.5H7.5C8.05228 3.5 8.5 3.94772 8.5 4.5V7.5C8.5 8.05228 8.05228 8.5 7.5 8.5H4.5C3.94772 8.5 3.5 8.05228 3.5 7.5V4.5Z"></path></svg>
                </div>
              </div>
              <div
                tabindex="0"
                class="flex items-center ml2 quiet link-unquiet pointer focus-visible-opaque focus-container mr2"
                role="button"
                aria-label="Close side panel"
                v-show="showRightSideWorkSpace"
                @click="closeRightSideWotkSpace()"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  class="parent-focus-visible-current-color"
                  style="shape-rendering: geometricprecision"
                >
                  <path
                    fill-rule="evenodd"
                    fill="currentColor"
                    d="M7.41421356,6 L9.88226406,3.5319495 C10.0816659,3.33254771 10.0828664,3.01179862 9.88577489,2.81470708 L9.18529292,2.11422511 C8.97977275,1.90870494 8.66708101,1.91870543 8.4680505,2.11773594 L6,4.58578644 L3.5319495,2.11773594 C3.33254771,1.91833414 3.01179862,1.91713357 2.81470708,2.11422511 L2.11422511,2.81470708 C1.90870494,3.02022725 1.91870543,3.33291899 2.11773594,3.5319495 L4.58578644,6 L2.11773594,8.4680505 C1.91833414,8.66745229 1.91713357,8.98820138 2.11422511,9.18529292 L2.81470708,9.88577489 C3.02022725,10.0912951 3.33291899,10.0812946 3.5319495,9.88226406 L6,7.41421356 L8.4680505,9.88226406 C8.66745229,10.0816659 8.98820138,10.0828664 9.18529292,9.88577489 L9.88577489,9.18529292 C10.0912951,8.97977275 10.0812946,8.66708101 9.88226406,8.4680505 L7.41421356,6 L7.41421356,6 Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['rigthSideWorkSpaceWidth','leftSideWorkSpaceWidth','showRightSideWorkSpace','showLeftSideWorkSpace'])
    },
    methods:{
      openRightSideWorkSpace(){
        // this function with open right side workspace if its not showing if it is open then this function will close the right workspace

        var status =  false;
        if(!this.showRightSideWorkSpace){
          status = true;
        }
        this.$store.commit('CHANGE_STATE_OF_RIGHT_WORK_SPACE',status);
      },
      closeRightSideWotkSpace(){
         this.$store.commit('CHANGE_STATE_OF_RIGHT_WORK_SPACE',false);
      },

      closeLeftSideWotkSpace(){
         var status =  false;
          if(!this.showLeftSideWorkSpace){
          status = true;
        }
         this.$store.commit('CHANGE_STATE_OF_LEFT_WORK_SPACE',status);
      }
    }
}
</script>