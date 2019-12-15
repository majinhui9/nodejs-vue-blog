<template>
  <section class="imgManage">
    <Upload action="/api/v1/uploadImg" :show-upload-list="false" :on-success="uploadSuccess" style="margin-bottom:10px;">
        <Button type="primary" icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
    <section v-if="list.length > 0">
      <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="fillPath">
          <strong>/api/img/{{ row.filename }}</strong>
        </template>
        <template slot-scope="{ row }" slot="qn_Path">
          <strong>{{ $bsaeSrc + row.filename }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="view(row.filename)">预览</Button>
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page :total="page.total" :page-size="page.per_page" :current="page.current_page" show-total
              @on-change="handlePage"></Page>
      </section>

    </section>
  </section>
</template>

<script>
  import merge from 'webpack-merge'
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "list",
    data() {
      return {
        list: [],
        page: {},
        currentPage: 1,
        columns: [
          {
            title: 'ID',
            key: 'id',
            width: 80,
            align: "center"
          },
          {
            title: '名称',
            key: 'filename'
          },
           {
            title: 'url',
            slot: 'fillPath'
          },
          {
            title: 'qn_url',
            slot: 'qn_Path'
          },
          {
            title: '上传时间',
            key: 'created_at'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 200,
            align: 'center'
          }
        ]
      }
    },
    created() {
      this._getImgList();
    },
    methods: {
      ...mapActions({
        getImgList: 'imgManage/getImgList',
        destroyComments: 'imgManage/destroyImg'
      }),
      // 获取分类
      async _getImgList() {
        const res = await this.getImgList({
          page: this.currentPage
        });

        this.list = res.data.data.data;
        this.page = res.data.data.meta;
      },
      // 切换分页
      handlePage(page) {
        this.$router.replace({
          query: merge(this.$route.query, {
            page
          })
        });
        this.currentPage = page;
        this._getImgList();
      },
      reply(id) {
        this.$router.push('/reply/' + id)
      },
      // 删除分类
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除此图片吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await this.destroyComments(id);
              this.$Message.success('删除成功');

              this._getImgList();

            } catch (e) {
              this.$Message.error(e);

            } finally {
              this.$Modal.remove();
            }

          },
          onCancel: () => {
            this.$Message.warning('取消！');
          }
        });
      },
      // 预览图片
      view(name) {
        const content = ` <p style="margin-left: -40px;"><img src="/api/img/${ name}" alt="" style="width:100%;"></p>`
         this.$Modal.info({
              title: '图片预览',
              content: content
          });
      },
      uploadSuccess() {
        this._getImgList();
        this.$Message.success('上传成功!');
      }
    }
  }
</script>

<style scoped>
  .page {
    padding: 32px 0;
    text-align: center;
  }
  .ivu-modal-confirm-body {
    padding: 0;
  }
</style>
