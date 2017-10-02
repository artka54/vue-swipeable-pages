<template>
  <div class="hello">
    <h1> World peace</h1>
    <p>World peace, or peace on Earth, is the concept of an ideal state of happiness, freedom and peace within and among all peoples and nations on earth. This idea of world non-violence is one motivation for peoples and nations to willingly cooperate, either voluntarily or by virtue of a system of governance that prevents warfare. Different cultures, religions, philosophies and organisations have varying concepts on how such a state would come about.</p>
      
    <img src="static/img/peace_sign.png">
            
    <p>Various religious and secular organisations have the stated aim of achieving world peace through addressing human rights, technology, education, engineering, medicine or diplomacy used as an end to all forms of fighting. Since 1945, the United Nations and the 5 permanent members of its Security Council (the US, Russia, China, France and the UK) have operated under the aim to resolve conflicts without war or declarations of war. Nonetheless, nations have entered numerous military conflicts since then.
    <br />     
    <br />     
    Source: <a href="https://en.wikipedia.org/wiki/World_peace">https://en.wikipedia.org/wiki/World_peace</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Second-Page',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin:20px 0px 10px 0px;
  padding: 0;
  text-align: center;
}

.hello {
    padding-bottom: 20px;
}
    
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
    
p {
    margin: 0 auto;
    padding: 15px;
    text-align: justify;
    max-width: 500px;
    font-size: 20px;
}

img {
    display: block;
    margin: 20px auto;
}
</style>
