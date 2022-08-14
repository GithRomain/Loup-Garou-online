<template>
  <p>HOME PAGE</p>
  <div>{{test}}</div>
</template>

<script>
//import http from "../http-common";
import {mapActions} from 'vuex';
import Pusher from 'pusher-js';
import Avatar from '../../databaseLocal/Avatar.json'

export default {
  name: "HomePage",
  components: {
  },
  data() {
    return {
      test: Avatar["avatar-1"].name
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
    var pusher = new Pusher('2af7c304097114bc8b99', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      console.log(data);
    });
  },
}
</script>

<style scoped>

</style>