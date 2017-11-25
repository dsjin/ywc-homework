<template>
  <div class="container">
    <div id="searchBar"class="section">
        <div class="field">
          <label class="label" >Search</label>
          <div class="control">
            <input class="input" type="text" placeholder="Name" v-model="name">
          </div>
          <p class="help">กรอกชื่อที่ช่องค้นหา</p>
        </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'SearchBar',
    data(){
      return {
        name:''
      }
    },
    watch:{
      name: function(val){
        this.$emit('value', this.name)
      }
    }
  }
</script>
<style scoped>
  #searchBar{
    padding-bottom: 0px
  }
</style>
