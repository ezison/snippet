import Vue from 'vue'
import AppHeader from './app-header.vue'
import AppFooter from './app-footer.vue'
import Snippet from '../snippet/snippet.vue'

Vue.component('app-header', AppHeader)
Vue.component('app-footer', AppFooter)
Vue.component('snippet', Snippet)

export default {
  name: 'app',
  data() {
    return {
    }
  }
}
