// store/index.js
import { createStore } from 'vuex'
//import router from "@/router";
import VuexPersistence from "vuex-persist";

export default createStore({
    state: {
        actualUser: null,
        actualToken: null,
    },
    getters: {},
    mutations: {
        //synchronize vuex store and localStorage thanks to mutation empty
        updateLocalStorage() {}},
    actions: {
        async updateStorage(context, payload){
            try {
                context.commit("updateLocalStorage", payload)
            }
            catch (e) {
                console.log(e)
            }
        }
    },
    plugins: [
        //plugin localStorage
        new VuexPersistence({
            storage: window.localStorage
        }).plugin
    ]
})