import { generateUuid } from '../common/uuid-v4'

/**
 * スニペットの永続化クラス。
 * スニペットデータ：
 * {
 *  id          : {string},
 *  title       : {string},
 *  category    : {string},
 *  description : {string}
 * }
 */
class SnippetStorage {

  /**
   * コンストラクタ。
   */
  constructor() {
  }

  /**
   * 保存処理。
   * @param  {Object} contents 保存内容
   */
  save(contents) {

    if (contents.id === null ||
        contents.id === '') {
        contents.id = generateUuid();
    }

    let editContentsList = this._getSnippetContents();
    editContentsList[contents.id] = contents;

    this._setSnippetContents(editContentsList);
  }

  /**
   * 削除処理（全て）。
   */
  removeAll() {

    this._setSnippetContents({});
  }

  /**
   * 任意のデータの削除処理。
   * @param  {Object} contents 削除内容
   */
  remove(contents) {

    let editContentsList = this._getSnippetContents();
    delete editContentsList[contents.id];

    this._setSnippetContents(editContentsList);
  }

  /**
   * IDで検索する。
   * @param  {String} id ID
   * @return {Object} 検索結果
   */
  findById(id) {

    let editContentsList = this._getSnippetContents();

    if (editContentsList[id] !== null) {
      return editContentsList[id];
    }

    return null;
  }

  /**
   * 全てのデータを取得する。
   * @return {Array} 全てのデータ
   */
  findAll() {

    let editContentsList = this._getSnippetContents();

    let snippetList = {};

    for (let key in editContentsList) {

      let snippet = editContentsList[key];
      let snippetSub = [];

      if (snippetList[snippet.category] === undefined) {
        snippetSub = [];
        snippetList[snippet.category] = snippetSub;
      } else {
        snippetSub = snippetList[snippet.category];
      }

      snippetSub.push(snippet);

    }

    // 昇順にソートする
    snippetList = this._sortObject(snippetList);
    for (let key in snippetList) {
      snippetList[key].sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }

    return snippetList;
  }

  _getSnippetContents() {

    let editContentsList = null;
    try {
      editContentsList = JSON.parse(localStorage.getItem('SnippetStorage_contents'));
      if (editContentsList === null) {
        editContentsList = {};
      }
    } catch (e) {
      editContentsList = {};
    }

    return editContentsList;

  }

  _setSnippetContents(list) {

    localStorage.setItem('SnippetStorage_contents', JSON.stringify(list));
  }

  _sortObject(object) {

    let sorted = {};
    let array = [];

    for (let key in object) {
        // 指定された名前のプロパティがオブジェクトにあるかどうかチェック
        if (object.hasOwnProperty(key)) {
            // 配列の最後にキーを追加する
            array.push(key);
        }
    }

    // 配列のソート
    array.sort();
 
    // 並び替えたキーの順番に sorted オブジェクトにデータを詰め直す
    for (let i = 0; i < array.length; i++) {
        sorted[array[i]] = object[array[i]];
    }

    return sorted;
}
}

export { SnippetStorage };
