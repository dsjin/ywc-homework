<template>
  <nav id="navbar" class="navbar is-info">
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" @click="signOut()">
            Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import vuex from '@/vuex'
  export default {
    name:'navbar',
    methods:{
      signOut(){
        vuex.dispatch('signOut')
      }
    }
  }
</script>
