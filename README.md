# vue-swipeable-pages

> A Vue.js plugin that enables swipeable pages, with each swipeable page corresponding to a route from vue-router.

## Demo
https://artka54.github.io/vue-swipeable-pages/

## Install
```bash
npm install vue-swipeable-pages --save
```

```javascript
import store from './store' // use your own store or create a store.js returning Vuex instance
import { vsp } from 'vue-swipeable-pages'
Vue.use(vsp, { store })
```


You must have a store, in case you do not have it already, create a store.js file in your /src and add this code:

```javascript
// store.js (If you do not have store.js)
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/* eslint-disable */
const store = new Vuex.Store({
    
})

export default store

```


## Usage

```vue
<vsp-container>
        <vsp-page slot="page" route="/"></vsp-page>
        <vsp-page slot="page" route="/second-page"></vsp-page>
        <vsp-page slot="page" route="/about-us"></vsp-page>

        <div slot="pagination-btn" class="swipeable-pagination-btn">Page1</div> 
        <div slot="pagination-btn" class="swipeable-pagination-btn">Second</div>
        <div slot="pagination-btn" class="swipeable-pagination-btn">About</div>
</vsp-container>
```


And you can customize main elements with this css:
```css

/* Page container */
#vsp-page-container {
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
```

# Edge cases
## Temporarily disable swipeable pages' functionality
In case you have a responsive table that enables horizontal scrolling or another element you want to swipe horizontally, you would have to disable the swiping to the next tab when swiping your element e.g:

```javascript
this.$el.querySelector('#myResponsiveTable').addEventListener('touchmove', function (e) {
  e.stopPropagation()
})
```


## Know bugs
There is a bug on ipad safari (possible on iphones too). When swiping the page the code doesn't block the vertical scrolling. I am going to look into it the following days.

## To Do
#Fix a bug mentioned above
#Improve transitions between pages as at the moment you can't see content when the next page is seen while swiping.


## Change log
v1.0.8 - fixed a bug when swiped pages where not correctly positioned if some pages contained vertical scrolling


## License
MIT

