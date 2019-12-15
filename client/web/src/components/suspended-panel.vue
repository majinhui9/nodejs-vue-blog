<template>
  <section class="suspended-panel" :style="{left: left}">
    <div @click="thumbsUp" :class="{active: isThumbsup}">
      <Badge :count="num" type="primary">
          <Avatar icon="ios-thumbs-up" title="点赞" />
      </Badge>
    </div>
    <div>
      <a href="#commentBox"><Avatar icon="ios-chatboxes" title="回复" /></a>
    </div>
    <div class="shareBox">
      <Avatar icon="md-share" title="分享" />
      <div class="toShare">
        <share :config="config"></share>
      </div>
    </div>
    <div @click="toBack"><Avatar icon="ios-undo" title="返回" /></div>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          isThumbsup: false
        }
      }
    },
    props: {
      content: {
        type: Object,
        default() {
          return {}
        }
      },
      offsetLeft: {
        type: Number,
        default: 200
      }
    },
    computed: {
      num: {
        get() {
          return this.content.thumbs_up || 1
        },
        set(val) {}
      },
      left() {
        return (this.offsetLeft - 90) + 'px'
      }
    },
    mounted() {
      // eslint-disable
      // 默认站点
      // ["weibo","qq","wechat","tencent","douban","qzone","linkedin","diandian","facebook","twitter","google"]
      this.config = {
        url: 'http://blog.majh.top/article/detail?id=' + this.content.id, // 网址，默认使用 window.location.href
        source: '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: this.content.title, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: this.content.description, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: '', // 图片, 默认取网页中第一个img标签
        sites: ['qzone', 'qq', 'weibo', 'wechat'], // 启用的站点
        disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
        wechatQrcodeHelper: ''
      }
    },
    methods: {
      toBack() {
        this.$router.go(-1)
        // history.go(-1)
      },
      thumbsUp() {
        this.$emit('thumbsUp')
        this.isThumbsup = true
      }
    }
  }
</script>
<style scoped>
  .suspended-panel{
    position: fixed;
    top: 300px;
    left: 150px;
    width: 100px;
    cursor: pointer;
  }
  .suspended-panel > * {
    /* display: block; */
    margin: 8px 0;
  }
  .suspended-panel > *:hover, .suspended-panel > .active {
    color: #2d8cf0;
  }
  .shareBox {
    position: relative;
  }
  .toShare {
    display: none;
    width: 120px;
  }
  .shareBox:hover .toShare {
    display: block;
    position: absolute;
    z-index: 99999;
    background: #f0f0f0;
  }
</style>
