<template>
    <div>
        <div id="swipeable-wrapper">
            <slot name="page"></slot> 
        </div>
        <div id="swipeable-pagination">
            <div id="pagination-moving-line"></div>  
            <slot name="pagination-btn"></slot>
        </div>
    </div>

</template>

<script>
    import '../assets/css/vsp-container-style.css'
    /* eslint-disable */
    export default {
        name: 'simple-swipeable-pages-container',
        data () {
            return {
                pagesWrapper: 'undefined',
                pages: [],
                pagespageStyleCount: 0,
                pageWidth: 0,
                touchStartX: 0,
                touchStartY: 0,
                touchMoveX: 0,
                touchMoveY: 0,
                touchMovedXDistanceAbsolute: 0,  
                touchMovedYDistance: 0,  
                pageIsMoving: false,
                longTouch: 'undefined',
                touchMovedYTreshold: 10,
                weightOnY: 20, // user has to swipe more on x axis plus this number than he is swiping on y axis to initiate the swipe e.g x > y +20  
                paginationMovingLine: 'undefined',
                paginationBtns: 'undefined',
                paginationBtnsWidth: 0,
                routesMapedToIndex: []
            }
        },
        methods: {
            /**
             * Move the page on to the div specified in the this.$store.state.vspstore.currentPageIndex and move the pagination's moving line
             * @param {string} argument - If set to animate, then add animate class, however if set as noanimate, then move without animation
             */
            movePage (animate) {
                
                this.$router.push(this.pages[this.$store.state.vspstore.currentPageIndex].dataset.route)
                
                for (let i = 0; i < this.pagesCount; i++) {
                    if (animate === 'noanimate') { // If special argument - noanimate set, then do not animate the transition
                        this.pages[i].classList.remove('swipeable-animate')
                    } else {
                        this.pages[i].classList.add('swipeable-animate') // when moving page add the animation class for effects
                    }
                    
                    // Move pagination
                    if (i != this.$store.state.vspstore.currentPageIndex) {
                        this.paginationBtns[i].classList.remove('active')
                    } else {
                        this.paginationBtns[i].classList.add('active')
                    }
                }
                
                // Move the line above
                this.paginationMovingLine.style.left = this.paginationBtnsWidth * this.$store.state.vspstore.currentPageIndex + '%'
                
                this.$store.commit('vspstore/transform', this.$store.state.vspstore.currentPageIndex * this.pageWidth)
                
                this.pageIsMoving = false
            },    
        
            /**
             * Add the touch events
             */
            addTouchEvents () {
                this.pagesWrapper.addEventListener('touchstart', (event) =>
                    this.touchStart(event))

                this.pagesWrapper.addEventListener('touchmove', (event) =>
                    this.touchMoving(event))

                this.pagesWrapper.addEventListener('touchend', (event) =>
                    this.touchEnded(event))
            },
            /**
             * This function is triggered when the user touches the screen
             * @param {object} event
             */
            touchStart (event) {
                // After 250ms has passed during touch this is considered a long touch and it has to be swiped over treshold to get to the next page, if it is not a long touch the move to the next page has been triggered
                this.longTouch = false
                setTimeout(() => {
                    this.longTouch = true
                }, 250)

                this.touchStartX = event.touches[0].pageX
                this.touchStartY = event.touches[0].pageY

                // Remove animation class when touch started
                for (let i = 0; i < this.pagesCount; i++) {
                    this.pages[i].classList.remove('swipeable-animate')
                }
            },

            /**
             * This function is triggered every moment as user moves his touch
             * @param {object} event
             */
            touchMoving (event) {
                this.touchMoveX = event.touches[0].pageX // x coordinates of where the touch is at the moment
                this.touchMoveY = event.touches[0].pageY // y coordinates of where the touch is at the moment
                this.touchMovedXDistanceAbsolute = this.$store.state.vspstore.currentPageIndex * this.pageWidth + (this.touchStartX - this.touchMoveX)
                this.touchMovedYDistance = Math.abs(this.touchStartY - this.touchMoveY)
                this.touchMovedXDistance = Math.abs(this.touchStartX - this.touchMoveX)
    
                // If this conditions are fulfilled only then initiate the swiping
                if ((this.touchMovedYDistance < this.touchMovedYTreshold && this.touchMovedYDistance + this.weightOnY < this.touchMovedXDistance) || (this.pageIsMoving == true )) { // So that user does not get next slide inadvertently by scrolling Y axis. If the page is already moving continue
                    
                    if (this.touchMovedXDistanceAbsolute < this.pageWidth * (this.pagesCount - 1)) { // This is not the last tab, so It can be swiped further
                        this.pageIsMoving = true
                        
                        
                        // Disable vertical scrolling while swiping
                        document.body.style.overflowY = 'hidden' // disable vertical scrolling while swiping horizontally
                        // The same as above but for ios safari
                        document.ontouchmove = function(event){
                            event.preventDefault();
                        }
                        
                        // As we initiate the swipe only after user has swiped exceeding the weightOnY pxs we
                        // have to add or subtract that value of the actual touch coordinates in order
                        // for the swipe to start at the edge and not at the position of the finger
                        let val = this.touchStartX - this.touchMoveX < 0 ? +this.weightOnY  : -this.weightOnY 
                        
                        for (let i = 0; i < this.pagesCount; i++) {
                            this.$store.commit('vspstore/transform', this.touchMovedXDistanceAbsolute + val)
                        }
                    }
                }
            },

            /**
             * When touch has ended update the current page index accordingly
             * @param {object} event
             */
            touchEnded (event) {
                const absoluteMove = Math.abs(this.touchStartX - this.touchMoveX) // Absolute moved distance in either direction
                const sliderOffset = this.$store.state.vspstore.currentPageIndex * this.pageWidth

                if (this.touchMoveX !== 0) { // If touch has not been moved do nothing. Only click/tap is no good.
                   if (this.touchMovedYDistance < this.touchMovedYTreshold || this.pageIsMoving == true ) { // So that user does not get next slide inadvertently by scrolling Y axis. If the page is already moving continue
                        if (absoluteMove > this.pageWidth / 2 || this.longTouch === false) { // If swiped at least over half or fast swipe* check further requirements
                            if (this.touchMovedXDistanceAbsolute > sliderOffset && this.$store.state.vspstore.currentPageIndex < (this.pagesCount - 1)) {
                                this.$store.state.vspstore.currentPageIndex++
                            } else if (this.touchMovedXDistanceAbsolute < sliderOffset && this.$store.state.vspstore.currentPageIndex > 0) {
                                this.$store.state.vspstore.currentPageIndex--
                            }
                        }
                   }
                    this.movePage()
                    this.touchMoveX = 0 // After touch has ended reset the touch move (Otherwise on next click script will think touch has been moved and there will be swipe again)
                    
                    
                    // when the swiping ends restore the ability to scroll vertically
                    document.body.style.overflowY = 'auto' 
                    // The same as above but for ios safari
                    document.ontouchmove = function(e){ return true; }
                }
            },
            
            setPaginationBts () {
                for (let i = 0; i < this.pagesCount; i++) { // Set proportional size for every button AND activate buttons
                    this.paginationBtns[i].style.width = this.paginationBtnsWidth + '%'
                    this.paginationBtns[i].addEventListener('click', () => this.moveTo(i))
                }
            },

            /**
             * Recalculate the page width AND position the current page accordingly to the new wrapper width
             */
            recalcPageWidth () {
                
                // When calculating the current page width remove the vertical scroller in order 
                // to have a consisten page width
                document.body.style.overflowY = 'hidden'
                this.pagesWrapper.style.width = '100%' // lets fill the pagesWrapper to all rescaled window
                this.pageWidth = this.pagesWrapper.offsetWidth // let's get that size in the pixels
                this.pagesWrapper.style.width = this.pageWidth + 'px' // set that size consistent across the pages in order to be able to correctly position the swiped pages
                document.body.style.overflowY = 'auto' // let's return the vertical scroller if needed
                
                for (let i = 0; i < this.pagesCount; i++) {
                    this.pages[i].classList.remove('swipeable-animate')
                    this.$store.commit('vspstore/transform', this.$store.state.vspstore.currentPageIndex * this.pageWidth)
                }
            },

            /**
             * Move to specific page with animation
             * @param {integer} page number - starts from 0
             */
            moveTo (pageIndex) {
                this.$store.commit('vspstore/setNewPageIndex', pageIndex)
                this.movePage()
            },

            /**
             * Move to specific page without animation
             * @param {integer} page number - starts from 0
             */
            loadTo (pageIndex) {
                this.$store.commit('vspstore/setNewPageIndex', pageIndex)
                this.movePage('noanimate')
            },
            
            /**
             * Map routes to index number. Necessary for initial load to know which
             * route corresponds which page index (slide)
             */
            mapRoutesToIndex () {
                for (let i = 0; i < this.pagesCount; i++) {
                    this.routesMapedToIndex.push(this.pages[i].dataset.route) 
                }
            },
            
            /**
             * Initial load sets the correct page slide for the route requested
             * @param {string} route - will be route indicated in url
             */
            initialLoad (route) {
                for(var key in this.routesMapedToIndex) {
                    if(this.routesMapedToIndex[key] === route) {
                        this.loadTo(key)  
                    }
                }
            }
            
        },
        mounted () {
            this.pagesWrapper = this.$el.querySelector('#swipeable-wrapper')
            this.addTouchEvents()
            
            this.pages = this.pagesWrapper.children
            this.pagesCount = this.pages.length
            
            
            
            // When calculating the current page width remove the vertical scroller in order 
            // to have a consisten page width
            document.body.style.overflowY = 'hidden'
            this.pageWidth = this.pagesWrapper.offsetWidth
            this.pagesWrapper.style.width = this.pageWidth + 'px' // every page will have this width
            document.body.style.overflowY = 'auto' // let's return the vertical scroller if needed
            
            this.paginationMovingLine = this.$el.querySelector('#pagination-moving-line')
            this.paginationBtnsWidth = 100 / this.pagesCount
            this.paginationMovingLine.style.width = this.paginationBtnsWidth + '%'
            
            this.paginationBtns = this.$el.querySelectorAll('.swipeable-pagination-btn')
            
            this.setPaginationBts()
            
            // On resize calculate and reposition pages
            window.addEventListener('resize', () => this.recalcPageWidth())
            
            this.mapRoutesToIndex()
            
            this.initialLoad(this.$route.path)
        }
    }
</script>

<style>

</style>