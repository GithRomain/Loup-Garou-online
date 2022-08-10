<template>
  <input placeholder="email or psuedo" v-model="emailOrPseudo">
  <input placeholder="password" v-model="password">
  <button v-on:click="logIn">LogIn</button>
  <button v-on:click="test">TEST</button>
</template>

<script>
import http from "../http-common";
import {mapActions} from 'vuex';

export default {
  name: "HomePage",
  data() {
    return {
      emailOrPseudo: "",
      password: "",
    };
  },
  computed:{
    local(){
        return localStorage.getItem('store')
    }
  },
  methods:{
    ...mapActions(['updateStorage']),
    logIn(){
      const newUser = {
        emailOrPseudo: this.emailOrPseudo,
        password: this.password
      }
      http
          .post("/user/logIn", newUser)
          .then(res => {
            console.log(res);
            this.$store.state.actualUser = res.data.user;
            this.$store.state.actualToken = res.data.token;
            this.updateStorage();
          })
          .catch(err => console.log(err))
    },
    test(){
      const uri = "/user/test";
      const options = {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + JSON.parse(localStorage.getItem('vuex')).actualToken
        }
      };
      http
          .request(uri, options)
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err))
    },
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>