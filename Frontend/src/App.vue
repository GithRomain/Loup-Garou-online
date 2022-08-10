<template>
  <button v-on:click="test">PUSH</button>
  <tbody v-bind:class="[{white :lightMode === 'white'}]">
  <!-- <div></div> -->
  <Header></Header>
  <!-- <router-view/> -->
  </tbody>
</template>


<script>
import Header from "@/components/RouterView";

export default {
  name: "app",
   components: {Header},
  data() {
    return {
      lightMode: 'white'
    };
  },
  methods:{
    test(){
      var html = document.getElementsByTagName('body');
      html.classList.add('white');
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");

html, body{

  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}

.white {
  background-color: var(--lightBackground);
}

:root
  {
  --lightTheme: #7549cc;
  --lightText: 	#724f36;
  --lightBrown: #d4b9f0;
  --lightBordeaux: #9769d2;
  --lightBackground: #fdf4c0;

  --darkTheme: #772330;
  --darkText: #d8bc94;
  --darkTextBold: #b08165;
  --darkBordeaux: #4d2129;
  --darkBackground: #382129;
  }
</style>
