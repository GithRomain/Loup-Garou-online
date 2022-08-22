<template>
  <label class="switch">
    <input type="checkbox" v-model="lightMode" v-on:click="switchLightMode">
    <span class="slider round"></span>
  </label>
</template>

<script>
import {mapActions} from "vuex";
import http from "../http-common";

export default {
  name: "NavBar",
  components: {
  },
  data() {
    return {
      lightMode: this.$store.state.actualUser.lightMode,
      language: false,
    };
  },
  computed:{
  },
  methods:{
    ...mapActions(['updateStorage']),
    //to show the previous lightMode we have to reload the page once
    determineIfReload(){
      if (this.$store.state.reloadTime === 0){
        this.$store.state.reloadTime += 1;
        this.updateStorage();
        this.$router.go();
      }
    },

    //switch the lightMode
   switchLightMode(){
      if (this.$store.state.actualUser.lightMode){
        this.$store.state.actualUser.lightMode = false;
      }
      else {
        this.$store.state.actualUser.lightMode = true;
      }
      //updateStore
      this.updateStorage();
      //To have settings saved we update this set
      http
          .put("/user/updateLightMode", this.$store.state.actualUser)
          .then(res => {
            console.log(res);
            this.$router.go();
          })
          //if there is error
          .catch(err => {
            //tell the user what error this is
            alert(err.response.data.error)
          })
   }
  },
  mounted() {
    this.determineIfReload()
  }
}
</script>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>