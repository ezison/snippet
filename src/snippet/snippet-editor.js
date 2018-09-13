import $ from 'jquery'
import { SnippetStorage } from './snippet-storage'
import { Notification } from 'element-ui';

/**
 * ステータス
 */
const statusEnum = {
  STATUS_NONE : -1, // 未表示
  STATUS_NEW  :  0, // 新規追加
  STATUS_VIEW :  1, // 閲覧
  STATUS_EDIT :  2  // 編集
};

export default {

  data () {
    return {
      statusEnum : statusEnum,
      status : statusEnum.STATUS_NONE,
      editContents: {
        id          : null,
        title       : null,
        category    : null,
        description : null
      }
    }
  },

  mounted: function () {
    this.$nextTick(function () {
      // ビュー全体がレンダリングされた後にのみ実行されるコード
      // 高さを調整する
      var windowHeight = $(window).outerHeight();
      $(this.$refs.description).css('height', (windowHeight - (56 + 38 + 38 + 38 + 58)) + "px");

    })
  },

  methods: {
    // クリップボードのコピーイベント
    onCopyToClipboard: function () {

      let dom = this.$refs.description;
      $(dom).select();
      document.execCommand('copy');

      Notification.info({
        title   : 'Info',
        message : 'クリップボードにコピーされました。',
        duration: 2000
      });
    },
    // 編集イベント
    onEdit: function () {
      this.status = this.statusEnum.STATUS_EDIT;
    },
    // キャンセルイベント
    onCancel: function () {

      if (this.status === this.statusEnum.STATUS_NEW) {
        // 新規追加後のキャンセルは、表示なし状態にする
        this.status =this.statusEnum.STATUS_NONE;
      } else {
        // 既存データの編集からのキャンセルは、参照状態にする
        this.status = this.statusEnum.STATUS_VIEW;
      }

    },
    // 保存イベント
    onSave: function () {
      this.saveSnippet();
      this.status = this.statusEnum.STATUS_VIEW;

      Notification.success({
        title   : 'Complete',
        message : '保存しました。',
        duration: 2000
      });

      this.$emit('refresh-snippet');
    },
    // 削除イベント
    onDelete: function () {
      this.removeSnippet();
      this.status = this.statusEnum.STATUS_NONE;

      Notification.warning({
        title   : 'Complete',
        message : '削除しました。',
        duration: 2000
      });

      this.$emit('refresh-snippet');
    },
    // スニペットの削除処理
    removeSnippet: function() {
      var s = new SnippetStorage();
      s.remove(this.editContents);
    },
    // スニペットの保存処理
    saveSnippet: function() {
      var s = new SnippetStorage();
      s.save(this.editContents);
    },
    // スニペットの新規追加処理
    addSnippet: function() {
      this.status = this.statusEnum.STATUS_NEW;
      this.editContents.id = null;
      this.editContents.title = null;
      this.editContents.category = null;
      this.editContents.description = null;
    },
    // スニペットのロード処理
    loadSnippet: function(id) {
      var s = new SnippetStorage();
      var editContents = s.findById(id);
      if (editContents !== null) {
        this.editContents = editContents;
        this.status = this.statusEnum.STATUS_VIEW;
      }
    }
  }

}
