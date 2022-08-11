<template>
  <p>HOME PAGE</p>
</template>

<script>
//import http from "../http-common";
import {mapActions} from 'vuex';



export default {
  name: "HomePage",
  components: {
  },
  data() {
    return {
    };
  },
  computed:{
    local(){
        return localStorage.getItem('store')
    }
  },
  methods:{
    ...mapActions(['updateStorage']),
  },
  mounted() {

  },
}
</script>

<style scoped>

</style>