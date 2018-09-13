import Vue from 'vue'

import SnippetEditor from './snippet-editor.vue'
import SnippetList from './snippet-list.vue'
import SnippetManipulate from './snippet-manipulate.vue'

Vue.component('snippet-editor', SnippetEditor)
Vue.component('snippet-list', SnippetList)
Vue.component('snippet-manipulate', SnippetManipulate)

export default {
  data () {
    return {
    }
  },
  methods: {
    // スニペットの追加処理
    addSnippet : function() {
      this.$refs.snippetEditor.addSnippet();
    },
    // スニペットの閲覧処理
    viewSnippet : function(id) {
      this.$refs.snippetEditor.loadSnippet(id);
    },
    // スニペットの更新処理
    refreshSnippet : function() {
      this.$refs.snippetList.refreshSnippet();
    }
  }
}
