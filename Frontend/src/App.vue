<template>
  <!-- <div></div> -->
  <RouterView></RouterView>
  <!-- <router-view/> -->
</template>


<script>
import RouterView from "@/components/RouterView";

export default {
  name: "app",
   components: {RouterView},
  data() {
    return {
      lightMode: 'white'
    };
  },
  methods:{
    miseAJourMode(){
      if (this.$store.state.lightMode === 'white'){
        document.body.classList.add('white');
      }
      else {
        document.body.classList.add('dark');
      }
    }
  },
  mounted() {
    this.$nextTick(this.miseAJourMode)
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");

html, body{
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.white {
  background-color:  var(--darkBackground);
}

.dark {
  background-color: var(--darkBackground);
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
