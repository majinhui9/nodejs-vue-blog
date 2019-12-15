<template>
  <section>
    <section v-if="list.length > 0">
      <Table :loading="loading" border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="error" size="small" @click="destroy(row.id)">删除</Button>
        </template>
      </Table>

      <section class="page">
        <Page :total="page.total"
              :page-size="page.per_page"
              :current="page.current_page"
              show-total
              @on-change="handlePage"></Page>
      </section>
    </section>
  </section>
</template>

<script>
  import article from '../../api/article';

  export default {
    name: "list",
    page: {},
    currentPage: 1,
    data() {
      return {
        loading: true,
        list: [],
        columns: [
          { title: 'ID', key: 'id', width: 80, align: "center" },
          { title: '文章标题', key: 'article_title', align: "center" },
          { title: 'ip', key: 'ip', align: "center" },
          { title: '浏览器', key: 'browser', align: "center" },
          { title: '系统', key: 'os', align: "center" },
          { title: '浏览时间', key: 'created_at', align: "center" },
          { title: '操作', slot: 'action', width: 200, align: 'center' }
        ]
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      // 获取日志
      async fetchData() {
        const res = await article.getLog({
          page: this.currentPage,
        });
        this.list = res.data.data.data;
        this.page = res.data.data.meta;
        this.loading = false;
      },
      // 切换分页
      handlePage(page) {
        this.currentPage = page;
        this.fetchData();
      },
      // 删除
      destroy(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除这条日志吗？</p>',
          loading: true,
          onOk: async () => {
            try {
              await article.destroyLog(id);
              this.$Message.success('删除成功');

              this.fetchData();

            } catch (e) {
              console.log(e)
              this.$Message.error(e);

            } finally {
              this.$Modal.remove();
            }

          },
          onCancel: () => {
            this.$Message.warning('取消！');
          }
        });
      }
    }
  }
</script>

<style scoped>
  .page {
    padding: 32px 0;
    text-align: center;
  }
</style>
