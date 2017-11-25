<template>
  <div class="modal" :class="classes">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"><i class="fa fa-facebook-official icon" aria-hidden="true"></i>Share to Facebook</p>
        <button class="delete" aria-label="close" @click="close()"></button>
      </header>
      <section class="modal-card-body">
        <ShareCanvas :text="studentName" @value="blob = $event"/>
        <div class="control">
          <textarea class="textarea" type="text" placeholder="Comment" v-model="comment" rows="2"/>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div v-if="isSignIn">
          <button class="button is-success" :class="[{'is-loading':isLoad}]" @click="post()">Share!</button>
          <button class="button" @click="close()">Cancel</button>
        </div>
        <div v-else>
          <button class="button is-link" @click="signIn()">Login Facebook</button>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
  import vuex from '@/vuex'
  import ShareCanvas from './ShareCanvas'
  export default{
    name:'CardModal',
    components:{
      'ShareCanvas' : ShareCanvas
    },
    data(){
      return {
        comment:'',
        htmlElement:Object,
        blob:Blob,
        isSignIn:false,
        isLoad:false
      }
    },
    mounted(){
      this.htmlElement = document.querySelector("html")
      this.$firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.isSignIn = true
          }else{
            this.isSignIn = false
          }
        })
    },
    methods:{
      close:function(){
        this.htmlElement.className = ""
        vuex.commit("setModalRef",'')
        vuex.commit("setModel",false)
      },
      signIn(){
        vuex.dispatch('signIn')
      },
      signOut(){
        vuex.dispatch('signOut')
      },
      post(){
        if (vuex.getters.getToken) {
          this.isLoad = true
          var fd = new FormData()
          fd.append("access_token", vuex.getters.getToken)
          fd.append("source", this.blob)
          fd.append("caption", this.comment)
          this.$http.post('https://graph.facebook.com/me/photos?access_token='+vuex.getters.getToken,fd).then((res)=>{
            alert("แชร์เรียบร้อยแล้ว")
            this.isLoad = false
          })
        }
      }
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
      filterList(){
        var refSubString = [this.ref.substring(0,2),this.ref.substring(2)]
        if (refSubString[0] === "PG") {
          return this.programming.find((item)=>{
            return item.interviewRef === this.ref
          })
        }else if(refSubString[0] === "CT"){
          return this.content.find((item)=>{
            return item.interviewRef === this.ref
          })
        }else if(refSubString[0] === "DS"){
          return this.design.find((item)=>{
            return item.interviewRef === this.ref
          })
        }else{
          return this.marketing.find((item)=>{
            return item.interviewRef === this.ref
          })
        }
      },
      studentName(){
        if (this.filterList) {
          return this.filterList.firstName
        }
        return ""
      },
      open:function(){
        return vuex.getters.getShowModal
      },
      classes:function(){
        return {
          'is-active' : this.open
        }
      },
      ref:function(){
        return vuex.getters.getModalRef
      }
    },
    watch:{
      open:function(val){
        if (val) {
          this.htmlElement.className = "is-clipped"
        }
      }
    }
  }
</script>
<style>
  .control{
    margin-top: 20px;
  }
  .icon{
    margin-right: 10px
  }
</style>
