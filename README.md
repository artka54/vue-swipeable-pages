# vue-swipeable-pages

> A Vue.js plugin that enables swipeable pages with each swipeable page corresponding to your specified route.

## Demo

## Recomended usage

## Install
```bash
npm install vue-swipeable-pages --save
```

You must have a store, in case you do not have it already, create a store.js file in your /src and add this code:
```vue
// store.js (If you do not have store.js)
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/* eslint-disable */
const store = new Vuex.Store({
    
})

export default store

```

Proceed with instalation:

```vue
import store from './store' // use your own store or create as mentioned above
import { vsp } from './index.js'
Vue.use(vsp, { store })
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

## License
MIT

