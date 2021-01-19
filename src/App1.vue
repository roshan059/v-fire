<template>
  <div id="app">
    <div id="topHeader">
      <div
        class="flex left-side-panel-nav"
        :style="'width:' + (dragValueLeft - 1.5) + '%'"
      >
        <div class="open-workflow-panel">
          <button @click="openLeftWorkFlow()">Open Workflow</button>
        </div>
        <div class="fullscreen-btn" @click="fullscreenLeftWorkFlow">
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
              d="M4 0H2C0.895431 0 0 0.895432 0 2V4H2V2H4V0Z M4 10.0154H2V8H0V10.0154C0 11.12 0.895431 12.0154 2 12.0154H4V10.0154Z M8 12.0154V10.0154H10V8H12V10.0154C12 11.12 11.1046 12.0154 10 12.0154H8Z M8 2V0H10C11.1046 0 12 0.895431 12 2V4H10V2H8Z M3.5 4.5C3.5 3.94772 3.94772 3.5 4.5 3.5H7.5C8.05228 3.5 8.5 3.94772 8.5 4.5V7.5C8.5 8.05228 8.05228 8.5 7.5 8.5H4.5C3.94772 8.5 3.5 8.05228 3.5 7.5V4.5Z"
            ></path>
          </svg>
        </div>
        <div class="left-panel-close-btn" @click="closeLeftWorkSpace()">
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
      <!-- <h1>{{dragValueRight}}</h1>
      <h1>{{dragValueLeft}}</h1> -->
    </div>
    <div class="application-container">
      <div
        id="table-container"
        :style="'width:' + dragValueRight + '%'"
        class=""
        v-show="rightFullScreenFlag"
      >
        <div class="absolute m-all-0 flex">
          <hot-table :settings="hotSettings" :data="list">
            <hot-column id="id" data="name" :width="100" ></hot-column>
          </hot-table>
        </div>
      </div>
      <div
        id="workflow-container"
        :style="'width:' + dragValueLeft + '%'"
        v-show="workFlowFlag"
      >
        <div class="left-top-border-radius"></div>
        <div
          @drag="drag"
          class="middle-bar-for-resize item-center"
          v-if="!leftFullscreenFlag"
        >
          <div
            @drag="drag"
            class="flex flex-column item-center handle"
            style="height: 40px"
          >
            <div class="white circle" style="width: 3px; height: 3px"></div>
            <div
              class="white circle handle-middle-circle"
              style="width: 3px; height: 3px"
            ></div>
            <div class="white circle" style="width: 3px; height: 3px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { panels } from "./config/firebase";
import { HotTable, HotColumn } from "@handsontable/vue";
import Handsontable from "handsontable";
export default {
  components: {
    HotTable,
    HotColumn,
  },
  data() {
    return {
      user: {
        name: "",
      },
      dragValueLeft: 47,
      dragValueRight: 53,
      workFlowFlag: true,
      leftFullscreenFlag: false,
      rightFullScreenFlag: true,

      txtName: "",
      list: [],
      hotData: [
        {
          id: 1,
          name: "Table tennis racket",
          payment: { price: 13, currency: "PLN" },
        },
        {
          id: 2,
          name: "Outdoor game ball",
          payment: { price: 14, currency: "USD" },
        },
        {
          id: 3,
          name: "Mountain bike",
          payment: { price: 300, currency: "USD" },
        },
      ],
      secondColumnSettings: {
        title: "Second column header",
      },
      fullscreen: false,
      hotSettings: {
        contextMenu: {
          callback: this.addNewRowTODataBase,
        },
         licenseKey: 'non-commercial-and-evaluation',
        rowHeaders: true,
        colHeaders: ["name"],
        autoRowSize: true,
        autoColumnSize: true,
        readOnly: false,
        afterChange: this.afterChangeVue,
      },
    };
  },

  mounted: function () {
    // alert();
  },

  created() {
    panels.orderBy('tbrow','asc').onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change) => {
        if (change.type == "added") {
          this.list.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        } else if (change.type == "removed") {
          let list_item = document.getElementById(change.doc.id);
          if (list_item) {
            list_item.parentNode.removeChild(list);
          }
        }
      });
    });
  },
  methods: {
    addNewRowTODataBase(key, selection, clickEvent) {
      console.log(key);
        console.log(selection);
          console.log(clickEvent.id);
      if (key == "row_below") {

        const tbrow = selection[0].end.row;
  
        const user = {
          name:'',tbrow:tbrow+1
        }
        panels.add(user).then(function(){
          console.log('done');
        });
      }
      else if(key=="remove_row"){

        // this.deleteItem(id);
      }
    },
    afterChangeVue(changes, source) {
      // alert(source);
      console.log("changes, source => ", changes, source);
    },
    closeLeftWorkSpace() {
      this.workFlowFlag = false;
      this.dragValueRight = 100;
    },
    openLeftWorkFlow() {
      if (!this.workFlowFlag) {
        this.workFlowFlag = true;
        this.dragValueRight = 57;
        this.dragValueLeft = 43;
      }
    },
    fullscreenLeftWorkFlow() {
      if (!this.leftFullscreenFlag) {
        this.leftFullscreenFlag = true;
        this.rightFullScreenFlag = false;
        this.workFlowFlag = true;
        this.dragValueLeft = 100;
      }
    },
    updateData(docId,name){
      panels.doc(docId).update({
        name:name
      }).then(function(){
        console.log("successfully updated");
      })
    },
    drag(event) {
      const windowInnerWidth = window.innerWidth;
      const x = (event.clientX / windowInnerWidth) * 100;
      console.log(event.clientX);
      console.log("win: ", windowInnerWidth / 2);
      console.log("minus: ", windowInnerWidth - 300);
      if (
        event.clientX >= windowInnerWidth / 2 &&
        event.clientX < windowInnerWidth - 300
      ) {
        this.dragValueRight = x;
        this.dragValueLeft = 100 - this.dragValueRight;
      }
    },
    toggle() {
      this.$fullscreen.toggle(this.$el.querySelector(".example"), {
        wrap: false,
        callback: this.fullscreenChange,
      });
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    deleteItem: function (id) {
      if (confirm("Are you sure?")) {
        panels
          .doc(id)
          .delete()
          .then(function () {
            console.log("deleted");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
      }
    },
    submitName: function () {
      const user = {
        name: this.txtName,
      };

      console.log(user);

      panels.add(user).then((e) => {
        this.txtName = "";
      });
    },
  },
};
</script>


