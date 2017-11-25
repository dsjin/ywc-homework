<template>
  <section id="title" class="hero is-info">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{title}}
        </h1>
        <h2 class="subtitle">
          {{subtitle}}
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name:'Title',
    props:['title','subtitle']
  }
</script>
<style scoped>
  #title{
  }
</style>
