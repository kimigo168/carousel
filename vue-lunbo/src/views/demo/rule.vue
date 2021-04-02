<template>
  <div class="rule-wrap">
    <div class="var-box">
      <span class="select-value" @click="selectFact">投保人</span>
      <span class="select-value sv-1" @click="selectFact1">性别</span>
      <span class="select-icon" data-type="valueFact" @click="showSelect">
        <ul class="add-type-chose" v-if="showDrop">
          <li v-for="(item, index) in addTypeList" :key="index" @click.stop="selectFun(index)">{{item}}</li>
        </ul>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rule',
  props: {},
  data () {
    return {
      showDrop: false,
      addTypeList: ['添加条件', '添加变量', '添加动作', '删除']
    }
  },
  methods: {
    selectFact () {},
    selectFact1 () {},
    showSelect (e) {
      console.log('e', e)
      this.showDrop = !this.showDrop
    },
    selectFun (index) {
      this.showDrop = false
      console.log('index', index)
      if (index === 0) { // 添加条件

      } else if (index === 1) { // 添加变量

      } else if (index === 2) { // 添加动作

      } else { // 删除

      }
    }
  },
  created () {

  }
}
</script>
<style scoped>
.rule-wrap {
  min-height: 64px;
  border: 1px solid #E2E2E2;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
}
.var-box {
  /* min-width: 140px; */
  max-width: 140px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #398cbf;
  border-radius: 8px;
  padding: 0 10px;
}
.select-value {
  color: #398cbf;
  font-size: 14px;
  cursor: pointer;
  position: relative;
}
.sv-1 {
  margin-left: 4px;
}
.select-icon {
  width: 30px;
  height: 30px;
  display: inline-block;
  background-image: url('../../assets/icon_collect.svg');
  background-size: 16px 16px;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  position: relative;
  margin-left: auto;
}
.add-type-chose {
  width: 100px;
  height: 100px;
  border: 1px solid #E2E2E2;
  border-radius: 8px;
  background-color: #fff;
  font-size: 12px;
  padding: 10px;
  position: absolute;
  left: -6px;
  top: 34px;
}
.add-type-chose::before {
  width: 0;
  height: 0;
  content: '';
  border-bottom: 10px solid #E2E2E2;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  left: 10px;
  top: -9px;
}
.add-type-chose::after {
  width: 0;
  height: 0;
  content: '';
  border-bottom: 10px solid #fff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  left: 10px;
  top: -8px;
}
.add-type-chose li {
  height: 14px;
  line-height: 14px;
  margin-bottom: 8px;
  text-align: left;
}
.add-type-chose li:hover {
  color: #398cbf;
}
</style>
