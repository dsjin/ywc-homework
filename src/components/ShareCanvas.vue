<template>
  <div id="canvas-wrapper">
    <form>
        <img id="img-hidden" style="display:none" src="../assets/fb.png" crossorigin="anonymous"/>
    </form>
    <div class="font">
        <canvas id="canvas" style="display:none" />
    </div>
    <figure class="image is-1by1">
      <div id="image_for_crop">
      </div>
    </figure>
  </div>
</template>
<script>
  var canvas,ctx,image,imageForCrop
  var fonts
  var WebFont = require('webfontloader')
  export default {
    name:'ShareCanvas',
    props:['text'],
    data(){
      return {

      }
    },
    mounted(){
      WebFont.load({
        google: {
          families: ['Pattaya']
        },
        active: () => {
            ctx.font = "60pt Pattaya"
            this.reDraw("ชื่อ")
        }
      })
      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')
      image = document.getElementById('img-hidden')
      imageForCrop = document.getElementById('image_for_crop')
      canvas.crossOrigin = "Anonymous"
      ctx.drawImage(image, 0, 0)
    },
    methods:{
      dataURItoBlob: function(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/png'});
    },
    reDraw: function(val){
      canvas.width = image.width
      canvas.height = image.height
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.drawImage(image, 0, 0)
      ctx.textAlign="center"
      ctx.fillStyle = "white"
      ctx.font = "60pt Pattaya"
      ctx.fillText(val,image.width/2,image.height/2-35)
      var data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      var newImage = new Image()
      newImage.id = "pic"
      newImage.src = canvas.toDataURL()
      imageForCrop.innerHTML = ''
      imageForCrop.appendChild(newImage)
      this.$emit('value', this.dataURItoBlob(data))
    }
    },
    watch:{
      text:function(val){
        this.reDraw(val)
      }
    }
  }
</script>
<style scoped>
  #canvas{
    padding: 0;
    margin: auto;
    display: block;
  }
  .font{
    font-family: 'Pattaya', sans-serif;
  }
</style>
