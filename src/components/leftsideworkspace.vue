<template>
  <div
    id="leftsidecontainer"
    style="display: block; opacity: 1; transition-property: none"
    v-show="showLeftSideWorkSpace"
    :style="'width:' + leftSideWorkSpaceWidth + '%'"
  >
 
    <div class="leftsidecontainerheader vfire flex rounded-big-top-right">
      <div class="leftsidecontainertitle flex-auto flex items-center">
        <h5><strong>Left Side Workspace</strong></h5>
      </div>
    </div>
    <div id="insideleftcontainer" class="overflow-hidden">
      <div class="table-panel">
        <table class="table">
          <thead>
            <tr>
              <th class="sn-no" width="30px">#</th>
              <th>Name</th>
            </tr>
          </thead>

          <tr v-for="(item, index) in userData" :key="index">
            <td class="sn-no">{{ index + 1 }}</td>
            <td>
              <input
                type="text"
                :data-id="item.id"
                rows="3"
                :value="item.name"
                @keyup="updateNameRowValue">
            </td>
          </tr>
          <tr>
            <td>
              <div class="rowNumber" @click="addNewRow()">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  class="icon"
                  style="shape-rendering: geometricprecision"
                >
                  <path
                    fill-rule="evenodd"
                    fill="currentColor"
                    d="M9.5,5 L7,5 L7,2.5 C7,2.224 6.776,2 6.5,2 L5.5,2 C5.224,2 5,2.224 5,2.5 L5,5 L2.5,5 C2.224,5 2,5.224 2,5.5 L2,6.5 C2,6.776 2.224,7 2.5,7 L5,7 L5,9.5 C5,9.776 5.224,10 5.5,10 L6.5,10 C6.776,10 7,9.776 7,9.5 L7,7 L9.5,7 C9.776,7 10,6.776 10,6.5 L10,5.5 C10,5.224 9.776,5 9.5,5"
                  ></path>
                </svg>
              </div>
            </td>
            <td @click="addNewRow()"></td>
          </tr>

         
        </table>
      </div>

      <!-- <hot-table :settings="hotSettings" :data="userData">
        <hot-column data="name" :width="250"></hot-column>
        <hot-column data="id"></hot-column>
      </hot-table> -->
    </div>
  </div>
</template>

<script>
import { HotTable, HotColumn } from "@handsontable/vue";
import Handsontable from "handsontable";
import { mapState } from "vuex";
export default {
  data() {
    return {
      hotSettings: {
        licenseKey: "non-commercial-and-evaluation",
        rowHeaders: true,
        colHeaders: ["User Name", "id"],
        autoRowSize: true,
        autoColumnSize: true,
        readOnly: false,
      },
    };
  },
  computed: {
    ...mapState([
      "leftSideWorkSpaceWidth",
      "showLeftSideWorkSpace",
      "userData",
    ]),
  },
  components: {
    HotTable,
    HotColumn,
  },
  created() {
    this.$store.dispatch("getUserdataFromFirebase");
  },
  methods: {
    addNewRow() {
      this.$store.dispatch("addNewRow", this.userData.length).then((res) => {});
    },
    updateNameRowValue(e) {
      var value = e.target.value;
      var tableId = e.target.getAttribute("data-id");
      this.$store.dispatch("updateRowData", { value: value, id: tableId });
    },
  },
};
</script>