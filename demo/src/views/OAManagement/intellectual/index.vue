<template>
  <div class="container">
    <h2>健康小知识</h2>
    <div class="item">
        <p>1.&nbsp;&nbsp;你知道心率是什么吗，正常人的心率又是多少呢?</p>
        <p>答: &nbsp;&nbsp;心率是指正常人安静状态下每分钟心跳的次数，也叫安静心率，一般为60～100次/分，可因年龄、性别或其他生理因素产生个体差异。一般来说，年龄越小，心率越快，老年人心跳比年轻人慢，女性的心率比同龄男性快，这些都是正常的生理现象。安静状态下，成人正常心率为60～100次/分钟，理想心率应为55～70次/分钟（运动员的心率较普通成人偏慢，一般为50次/分钟左右）。</p>
    </div>
    <div class="item">
        <p>2.&nbsp;&nbsp;你知道正常人的血压应该是多少吗?</p>
        <p>答: &nbsp;&nbsp;话不多说直接上图</p>
        <img :src="url_banner" alt="">
    </div>
    <div class="item">
        <p>3.&nbsp;&nbsp;你知道血压高的人应该吃什么吗?</p>
        <p>答: &nbsp;&nbsp;高血压（hypertension）是指以体循环动脉血压（收缩压和/或舒张压）增高为主要特征（收缩压≥140毫米汞柱，舒张压≥90毫米汞柱），可伴有心、脑、肾等器官的功能或器质性损害的临床综合征。除了需要按照医嘱长期服用长效降压药物控制血压外，还需要在饮食上加以注意
          菠菜、莼菜、山楂、西瓜、橘子、香蕉等蔬菜水果是血压高的人的不错选择哦！
        </p>
    </div>
  </div>
</template>

<script>
// API
import { noticeList } from "@/api/oamanagement/notice";

export default {
  components: {},
  data() {
    return {
      url_banner:"./../../../../static/img/banner.png"
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
@import "../styles/tabs.scss";
.container{
  max-width: 1680px;
  min-width: 1080px;
  height: 100%;
  background: #fff;
  padding: 10px;
  .item{
    font-size: 15px;
    line-height: 45px;
  }
}
</style>
