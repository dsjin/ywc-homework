<template>
  <div id="app">
    <transition name="slide">
      <Navbar v-if="isShowNavbar"/>
    </transition>
    <Titlebox title="YWC" subtitle="SEMI-FINAL ROUND"/>
    <SearchBar @value="searchName = $event"/>
    <transition name="fade" mode="in-out">
      <div class="container" v-if="searchName.length === 0">
        <div id="visibleButtonGroup" class="section">
          <p class="title-text">เปิด/ปิดรายชื่อ</p>
          <div class="field is-grouped is-block-mobile">
            <p class="control">
              <Button class="button" :class="[{ 'is-info': show.design },{'is-danger': !show.design}]" @click="show.design=!show.design">Design</Button>
            </p>
            <p class="control">
              <Button class="button" :class="[{ 'is-info': show.marketing },{'is-danger': !show.marketing}]" @click="show.marketing=!show.marketing">Marketing</Button>
            </p>
            <p class="control">
              <Button class="button" :class="[{ 'is-info': show.programming },{'is-danger': !show.programming}]" @click="show.programming=!show.programming">Programming</Button>
            </p>
            <p class="control">
              <Button class="button" :class="[{ 'is-info': show.content },{'is-danger': !show.content}]" @click="show.content=!show.content">Content</Button>
            </p>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="container" v-if="searchName.length === 0" key="all">
        <div class="section">
          <div class="columns is-desktop">
              <transition name="fade">
                <CardTable key="design" title="design" :data="this.design" v-show="show.design"/>
              </transition>
              <transition name="fade">
                <CardTable key="marketing" title="marketing" :data="this.marketing" v-show="show.marketing"/>
              </transition>
          </div>
          <div class="columns is-desktop">
            <transition name="fade">
              <CardTable title="programming" :data="this.programming" v-show="show.programming"/>
            </transition>
            <transition name="fade">
              <CardTable title="content" :data="this.content" v-show="show.content" />
            </transition>
            </div>
          </div>
        </div>
        <div class="container" v-else key="search">
          <div class="section">
            <div class="columns is-desktop">
              <CardTable title="Search" :data="this.filterList"/>
            </div>
          </div>
        </div>
      </transition>
      <CardModal/>
    </div>
</template>

<script>
import CardTable from './components/CardTable.vue'
import Title from './components/Title.vue'
import SearchBar from './components/SearchBar.vue'
import CardModal from './components/CardModal.vue'
import Navbar from './components/Navbar.vue'
import vuex from '@/vuex'
export default {
  name: 'app',
  components: {
    'CardTable' : CardTable,
    'Titlebox':Title,
    'SearchBar':SearchBar,
    'CardModal':CardModal,
    'Navbar':Navbar
  },
  mounted(){
    this.$firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          vuex.dispatch('setToken')
          this.isShowNavbar = true
        }else{
          this.isShowNavbar = false
        }
      })
  },
  data(){
    return {
      searchName:'',
      show:{
        design:true,
        marketing:true,
        programming:true,
        content:true
      },
      isShowNavbar:false
    }
  },
  methods:{
  },
  computed:{
    programming(){
      return vuex.getters.getProgramming
    },
    marketing(){
      return vuex.getters.getMarketing
    },
    design(){
      return vuex.getters.getDesign
    },
    content(){
      return vuex.getters.getContent
    },
    modal(){
      return vuex.getters.getShowModal
    },
    filterList(){
      let allData = this.programming.concat(this.content , this.design , this.marketing)
      return allData.filter((item)=>{
        let splitName = this.searchName.split(" ")
        if (splitName.length >= 3) {
          let check = [false,false]
          for(let i = 0; i < splitName.length; i++){
            if (item.firstName.includes(splitName[i])) {
              check[0] = true
            }
            else if (item.lastName.includes(splitName[i])) {
              check[1] = true
            }
            else{
              check = [false,false]
            }
          }
          return check[0] && check[1]
        }
        if (splitName.length === 1) {
          return (item.firstName.includes(splitName[0]) || item.lastName.includes(splitName[0]))
        }
        return ((item.firstName.includes(splitName[0]) && item.lastName.includes(splitName[1]))) || item.firstName.includes(this.searchName) || item.includes(this.searchName)
      })
    }
  }
}
</script>

<style>
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
#visibleButtonGroup{
  padding-bottom: 0px
}
.title-text{
  margin-bottom: 10px
}
.slide-leave-active,
.slide-enter-active {
  transition: 0.5s;
}
.slide-enter {
  transform: translate(0, -100%);
}
.slide-leave-to {
  transform: translate(0, -100%);
}
</style>
