<template>
  <div id="app">
    <header>Logo</header>
    <vsp-container>
            <vsp-page slot="page" route="/"></vsp-page>
            <vsp-page slot="page" route="/second-page"></vsp-page>
            <vsp-page slot="page" route="/about-us"></vsp-page>
        
            <div slot="pagination-btn" class="swipeable-pagination-btn">Page1</div> 
            <div slot="pagination-btn" class="swipeable-pagination-btn">Second</div>
            <div slot="pagination-btn" class="swipeable-pagination-btn">About</div>
    </vsp-container>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

 
/* Page container */
#vsp-page-container {
    max-width:1024px;
    height: 100%;
    margin: 0 auto;
    background-color: white;
    border: 1px solid #d8d8d8;
}

/*  Navigation at the bottom  */
#swipeable-pagination {
    background-color: #ff5252;
}

/*  Buttons in the navigation  */
#swipeable-pagination > div { 
    font-size: 2.25em;
    line-height: 60px;
    color: darkred;
}
    
/* Navigation active state */    
#swipeable-pagination > div.active {
    color: yellow;
}
    
/* Moving line for the navigation */
#pagination-moving-line {
    border-top: 3px solid yellow;
}



</style>
