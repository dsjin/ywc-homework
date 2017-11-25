<template>
  <div class="card-table column">
    <div class="box hero">
      <h1 id="title-card" class="card is-capitalized is-size-4">{{title}}</h1>
      <table class="table is-fullwidth is-responsive">
        <thead>
          <tr>
            <th class="has-text-centered">ลำดับ</th>
            <th class="has-text-centered">ชื่อจริง</th>
            <th class="has-text-centered">นามสกุล</th>
            <th class="has-text-centered">เลขอ้างอิงสัมภาษณ์</th>
            <th class="has-text-centered">แชร์</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in data">
            <td class="has-text-centered">{{index+1}}</td>
            <td class="has-text-centered">{{item.firstName}}</td>
            <td class="has-text-centered">{{item.lastName}}</td>
            <td class="has-text-centered">{{item.interviewRef}}</td>
            <td class="has-text-centered">
              <form>
                <a class="button" @click="share(item.interviewRef)">
                  <span class="icon is-small">
                    <i class="fa fa-share"></i>
                  </span>
                </a>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import vuex from '@/vuex'
  export default{
    name: 'CardTable',
    props:['title','data'],
    methods:{
      share:function(ref_id){
        vuex.commit("setModalRef",ref_id)
        vuex.commit("setModel",true)
      }
    }
  }
</script>
<style scoped>
  .card-table{
    text-align: center;
  }
  #title-card{
    color:hsl(0, 0%, 96%);
    background-color: hsl(204, 86%, 53%)
  }
  @media screen and (max-width: 800px){
  .is-responsive{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    position: relative;
  }
  tbody{
    display: block;
    width: auto;
    position: relative;
    overflow-x: auto;
    white-space: nowrap;}
  }
</style>
