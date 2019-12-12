<template>
  <div>
      <div v-show="!viewCnt">
        <h2>接口/开发文档</h2>
        <ul class="docList">
            <li class="docItem" v-for="(item, i) in docList" :key="i" @click="getDocCnt(item.key)">{{item.value}}</li>
        </ul>
      </div>
      <div v-if="viewCnt" >
          <mavon-editor
          v-model="content"
          :ishljs="true"
          :editable="false"
          :toolbarsFlag="false"
          :navigation="true"
          :subfield="false"
          defaultOpen="preview"
          ref=md>
        </mavon-editor>

        <Button type="primary" @click="viewCnt=false" class="toback">返回</Button>
      </div>
  </div>
</template>

<script>
  import merge from 'webpack-merge'
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        docList: [
            {key: 'admin', value: '登录、用户api'},
            {key: 'advertise', value: '广告api'},
            {key: 'article', value: '文章api'},
            {key: 'category', value: '分类api'},
            {key: 'chapter-section', value: '章节目api'},
            {key: 'column-chapter', value: '专栏章节api'},
            {key: 'column', value: '专栏api'},
            {key: 'comment', value: '评论api'},
            {key: 'reply', value: '回复评论api'},
            {key: 'README', value: 'server目录结构'},
            {key: 'project', value: 'server介绍'},
            {key: 'nginx.conf', value: 'nginx配置样例'},
            {key: 'Linux常用命令', value: 'Linux常用命令'},
            {key: 'CentOS7安装NodeJS、mysql', value: 'CentOS7安装NodeJS、mysql'},
        ],
        content: '',
        viewCnt: false
      }
    },
    created() {},
    methods: {
      ...mapActions({
        getDoc: 'imgManage/getDoc'
      }),
      // 获取分类
      async getDocCnt(name) {
        const res = await this.getDoc(name);
        this.viewCnt = true
        this.content = res.data.data.content;
      }
    }
  }
</script>

<style scoped>
ul,li{ padding:0;margin:0;list-style:none;}
 .docList {
     color: #404040;
     line-height: 40px;
     padding: 20px;
     font-size: 16px;
 }
 .docItem {
     padding: 0 20px;
     cursor: pointer;
 }
 .toback{
     position:fixed;
     right: 50px;
     bottom:50px;
     z-index: 9999;
 }
</style>
