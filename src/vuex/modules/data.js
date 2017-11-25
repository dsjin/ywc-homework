import Vue from 'vue'
const state = {
  showModal: false,
  programming:[],
  marketing:[],
  design:[],
  content:[],
  modalRef:''
}
const getters = {
  getProgramming: (state) => state.programming,
  getMarketing:(state) => state.marketing,
  getDesign:(state) => state.design,
  getContent:(state) => state.content,
  getShowModal:(state) => state.showModal,
  getModalRef:(state) => state.modalRef
}
const actions ={
  getJSON({commit, state},url){
    Vue.http.get(url).then((res)=>{
      var major = ['programming', 'marketing', 'design', 'content']
      let arrayLength = res.data.length
      for (let i = 0; i < arrayLength; i++) {
          commit('push',res.data[i])
      }
      for (let i = 0; i < 4; i++){
        state[major[i]].sort(function(a,b){
          return a.interviewRef.substring(2) - b.interviewRef.substring(2)
        })
      }
    },
    (error)=>{
      console.log(error)
    })
  }
}
const mutations = {
  push:(state, data)=>{
    state[data.major].push(data)
  },
  setModel:(state, val)=>{
    state.showModal = val
  },
  setModalRef:(state, val)=>{
    state.modalRef = val
  }
}
export default {
    state,
    getters,
    actions,
    mutations
}
