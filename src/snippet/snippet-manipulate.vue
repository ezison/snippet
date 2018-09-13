<template>
  <div class="manipulation">
    <button class="btn btn-link" type="button" @click="$emit('add-snippet')"><span class="oi oi-plus"></span> 新しく追加</button>
  </div>
</template>

<script src="./snippet-manipulate.js"></script>
<style  src="./snippet-manipulate.css" lang="scss" scoped></style>
