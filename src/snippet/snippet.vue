<template>
  <div class="snippet">
    <div class="row">
      <div class="col-xl-3">

        <snippet-list
          ref="snippetList"
          @view-snippet="viewSnippet">
        </snippet-list>

        <snippet-manipulate
          @add-snippet="addSnippet">
        </snippet-manipulate>

      </div>

      <div class="col-xl-9">

        <snippet-editor
          ref="snippetEditor"
          @refresh-snippet="refreshSnippet">
        </snippet-editor>

      </div>
    </div>
  </div>
</template>

<script src="./snippet.js"></script>
<style  src="./snippet.css" lang="scss" scoped></style>
