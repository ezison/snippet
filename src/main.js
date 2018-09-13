import Vue from 'vue'
import App from './app/app.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'open-iconic/font/css/open-iconic-bootstrap.css';

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// ElementUIでの言語設定、datePickerとかで適用される
import locale from 'element-ui/lib/locale/lang/ja'

Vue.use(ElementUI, {locale});

new Vue({
  el: '#app',
  render: h => h(App)
})
