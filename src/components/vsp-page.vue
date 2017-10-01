<template>
    <div class="swipeable-page" :data-route=dataRoute v-bind:style="{ transform: 'translate3d(-' + this.$store.state.vspstore.xTranslate + 'px,0,0)'}">
        <div id="vsp-page-container" class="vsp-page-container">
            <keep-alive>
                <router-view v-if="dataRoute == this.$route.path"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import '../assets/css/vsp-page-style.css'
    export default {
      name: 'vsp-pages',
      props: ['route'],
      data: function () {
        return {
          dataRoute: this.route,
          xtranslate: this.$store.state.vspstore.xTranslate
        }
      }
    }
</script>

