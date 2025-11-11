<template>
  <navBar />

  <RouterView />


</template>

<script>

import navBar from './Component/navBar.vue';

export default{
  components:{
    navBar
  }
}



</script>