<template>
  <div class="search py-3">

    <div class="filter">

        <div class="input-group">
          <input class="form-control" type="text" placeholder="" v-model="nameFilter"></input>
          <div class="input-group-append">
            <span class="input-group-text">
              <span class="oi oi-magnifying-glass"></span>
            </span>
          </div>
        </div>

    </div>

    <div class="list py-2 px-1" ref="snippetList">

      <el-collapse>
        <template v-for="(rec, key, index) in filterList(list)">
          <el-collapse-item :title="key" :name="index">
            <template slot="title">
              <div class="header text-muted"><span class="oi oi-chevron-right"></span> {{key}}</div>
            </template>
            <div v-for="recSub in filterListSub(rec)">
              <button type="button" class="btn btn-link" @click="$emit('view-snippet', recSub.id)">
                <span class="oi oi-file"></span> {{recSub.title}}
              </button>
            </div>
          </el-collapse-item>
        </template>
      </el-collapse>

    </div>

  </div>
</template>

<script src="./snippet-list.js"></script>
<style  src="./snippet-list.css" lang="scss" scoped></style>
