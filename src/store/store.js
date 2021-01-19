import { db } from '../config/firebase.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        leftSideWorkSpaceWidth: 100,
        rigthSideWorkSpaceWidth: 0,
        showRightSideWorkSpace: false,
        showLeftSideWorkSpace: true,
        userData: []
    },

    mutations: {
        //this mutation will set the lefside and rightside work space width value
        SET_WORKSPACE_WIDTH(state, dragValue) {
            var windowInnerWidth = window.innerWidth;
            var dragValuePer = (dragValue / window.innerWidth) * 100;
            if (
                dragValue > (windowInnerWidth / 2) &&
                dragValue < (windowInnerWidth - 300)
            ) {
                state.leftSideWorkSpaceWidth = dragValuePer;
                state.rigthSideWorkSpaceWidth = 100 - dragValuePer;
            }

        },
        CHANGE_STATE_OF_RIGHT_WORK_SPACE(state, status) {
            //the value of status in a boolen (true or false)
            state.showRightSideWorkSpace = status;
            if (status) {
                var windowInnerWidthSplit = window.innerWidth / 2; // get the inner width of window and divided by 2 to get half value

                state.leftSideWorkSpaceWidth = state.rigthSideWorkSpaceWidth = windowInnerWidthSplit / window.innerWidth * 100;
            } else {
                state.showLeftSideWorkSpace = true;
                state.leftSideWorkSpaceWidth = 100;
                state.rigthSideWorkSpaceWidth = 0;
            }


        },
        CHANGE_STATE_OF_LEFT_WORK_SPACE(state, status) {
            if (status) {
                var windowInnerWidthSplit = window.innerWidth / 2; // get the inner width of window and divided by 2 to get half value

                state.leftSideWorkSpaceWidth = state.rigthSideWorkSpaceWidth = windowInnerWidthSplit / window.innerWidth * 100;

            } else {
                state.leftSideWorkSpaceWidth = 0;
                state.rigthSideWorkSpaceWidth = 100;

            }
            state.showLeftSideWorkSpace = status;
        },
        ClEAN_USERS_DATA(state, data) {
            state.userData = data;
        },
        ADD_USER_DATA(state, data) {
            // console.log(data);
            state.userData.push({
                id: data.id,
                name: data.name
            });
            // console.log(state.userData);
        },
        UPDATE_USER_DATA(state, data) {
            // console.log(data);
            const index = state.userData.findIndex(item => item.id == data.id)
            state.userData.splice(index, 1, {
                    'id': data.id,
                    'name': data.name
                })
                // console.log(state.userData);
        },
        SET_RIGHT_LEFT_PANEL_VALUE(state, data) {
            state.leftSideWorkSpaceWidth = data.l;
            state.rigthSideWorkSpaceWidth = data.r;
            if (data.s == 1) {
                state.showLeftSideWorkSpace = false;

            } else {
                state.showRightSideWorkSpace = false;
            }
        }

    },
    actions: {
        getUserdataFromFirebase(context) {


            db.collection('panels').orderBy('tbrow', 'asc').onSnapshot(res => {
                const changes = res.docChanges();
                changes.forEach((change) => {

                    if (change.type === "added") {
                        console.log(change.doc.id);


                        context.commit('ADD_USER_DATA', {
                            id: change.doc.id,
                            name: change.doc.data().name
                        });

                    }

                    if (change.type === 'modified') {
                        context.commit('UPDATE_USER_DATA', {
                            id: change.doc.id,
                            name: change.doc.data().name,

                        })
                    }

                });

            });
        },

        addNewRow(context, lastRow) {
            const user = {
                name: '',
                tbrow: lastRow + 1
            }
            db.collection('panels').add(user).then(function() {
                console.log('done');
            });
        },
        updateRowData(context, data) {
            console.log(data);
            db.collection('panels').doc(data.id).update({
                name: data.value
            });
        }
    }
});