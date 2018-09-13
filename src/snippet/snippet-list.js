import $ from 'jquery'
import { SnippetStorage } from './snippet-storage'
import { generateUuid } from '../common/uuid-v4'

// スニペット情報を全て読み込む
let storage = new SnippetStorage();
let snippetList = storage.findAll();

export default {
  data () {
    return {
      nameFilter: null,
      list: snippetList
    }
  },
  methods: {
    // スニペットの更新処理
    refreshSnippet: function() {
      let storage = new SnippetStorage();
      this.list = storage.findAll();
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      // 高さを調整する
      let windowHeight = $(window).outerHeight();
      $(this.$refs.snippetList).height(windowHeight - (56 + 38 + 38 + 32 + 48));

    })
  },
  computed: {
    // リストのフィルター処理（カテゴリ部分）
    filterList: function () {

      let self = this;

      // 引数を宣言したい場合の特殊な処理（関数を返却する）
      return function (list) {

        if (self.nameFilter === null ||
            self.nameFilter === '') {
              return list;
        }

        let ret = {};

        for (let key in list) {

          let rec = list[key];

          for (let i = 0; i < rec.length; i++) {
            let r = rec[i];
            // 中間一致
            if (r.title.indexOf(self.nameFilter) !== -1) {
              ret[key] = rec;
              break;
            }
          }

        }

        return ret;
      };

    },
    // リストのフィルター処理（タイトル部分）
    filterListSub: function (list) {

      let self = this;

      // 引数を宣言したい場合の特殊な処理（関数を返却する）
      return function (list) {

        if (self.nameFilter === null ||
            self.nameFilter === '') {
              return list;
        }

        return list.filter(function (rec) {
          // 中間一致
          if (rec.title.indexOf(self.nameFilter) !== -1) {
            return true;
          }

          return false;
        });
      };

    }
  }
}
