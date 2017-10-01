import vspPage from './components/vsp-page'
import vspContainer from './components/vsp-container'
import storeModule from './store/vsp-store'

const vsp = {
  install (Vue, { store }) {
    store.registerModule('vspstore', storeModule)

    Vue.component('vsp-container', vspContainer)
    Vue.component('vsp-page', vspPage)
  }
}

export {
  vsp
}
