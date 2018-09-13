<template>

  <div>

    <div class="edit py-4"
    v-show="status === statusEnum.STATUS_NONE">
      <h5 class="text-muted">
        <span class="oi oi-info"></span> 『新しく追加』ボタンを押すか、登録済みのスニペットを選択してください。
      </h5>
    </div>

    <div class="edit py-3"
    v-show="status !== statusEnum.STATUS_NONE">

      <div class="row">

        <div class="col-lg-12 title">
          <input v-model="editContents.id" type="hidden"></input>
          <input v-model="editContents.title" :readonly="status === statusEnum.STATUS_VIEW" class="form-control" type="text" placeholder="タイトル"></input>
        </div>

      </div>

      <div class="row">
        <div class="col-lg-12 category py-1">
          <input v-model="editContents.category" :readonly="status === statusEnum.STATUS_VIEW" class="form-control" type="text" placeholder="カテゴリ"></input>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 description py-1">
          <textarea ref="description" v-model="editContents.description" :readonly="status === statusEnum.STATUS_VIEW" name="description" class="form-control" style="width: 100%;" placeholder="スニペット">...</textarea>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 buttons py-1">
          <div class="row">
            <div class="col-xl-6">
              <button class="btn btn-secondary" v-if="status === statusEnum.STATUS_VIEW" @click="onCopyToClipboard"><span class="oi oi-clipboard"></span> クリップボードにコピー</button>
              <button class="btn btn-danger" type="button" v-if="status === statusEnum.STATUS_EDIT" @click="onDelete"><span class="oi oi-circle-x"></span> 削除</button>
            </div>
            <div class="col-xl-6">
              <div class="float-right">
                <button class="btn btn-primary" type="button" v-if="status === statusEnum.STATUS_VIEW" @click="onEdit"><span class="oi oi-lock-unlocked"></span> 編集</button>
                <button class="btn btn-primary" type="button" v-if="status !== statusEnum.STATUS_VIEW" @click="onSave"><span class="oi oi-pencil"></span> 保存</button>
                <button class="btn btn-secondary" type="button" v-if="status !== statusEnum.STATUS_VIEW" @click="onCancel">キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script src="./snippet-editor.js"></script>
<style  src="./snippet-editor.css" lang="scss" scoped></style>
