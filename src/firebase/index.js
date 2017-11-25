import firebase from 'firebase'

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', { value: firebase });
  }
}
