<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>数据统计</span>
      </div>
    </template>
    <div class="text item">
      <div class="total">
        本土现有确诊：<span>{{ store.chinaTotal.localConfirm }}</span>
      </div>
      <div class="add">较上日+({{ store.chinaAdd.localConfirmH5 }})</div>
    </div>
    <div class="text item">
      <div class="total">
        现有确诊：<span>{{ store.chinaTotal.nowConfirm }}</span>
      </div>
      <div class="add">较上日+({{ store.chinaAdd.nowConfirm }})</div>
    </div>
    <div class="text item">
      <div class="total">
        累计确诊：<span>{{ store.chinaTotal.confirm }}</span>
      </div>
      <div class="add">较上日+({{ store.chinaAdd.confirm }})</div>
    </div>
    <div class="text item">
      <div class="total">
        无症状感染者：<span>{{ store.chinaTotal.noInfect }}</span>
      </div>
      <div class="add">较上日+({{ store.chinaAdd.noInfect }})</div>
    </div>
    <div class="text item">
      <div class="total">
        境外输入：<span>{{ store.chinaTotal.importedCase }}</span>
      </div>
      <div class="add">较上日+({{ store.chinaAdd.importedCase }})</div>
    </div>
    <div class="text item">
      <div class="total">
        累计死亡：<span>{{ store.chinaTotal.dead }}</span>
      </div>
      <div class="add">较上日+({{ store.chinaAdd.dead }})</div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard } from "element-plus";
import { useStore } from "@/store/index";
import { ref } from "vue";

const store = useStore();
</script>

<style lang="less" scoped>
:deep(.el-card__body) {
    padding: 5px 10px;
}
:deep(.el-card__header) {
    padding: 5px 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  .total {
    span {
      color: greenyellow;
      font-weight: 700;
    }
  }
}

.box-card {
  width: 100%;
  height: 100%;
}
</style>
