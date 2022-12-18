<template>
  <div style="height: 100%; background-color: black; color: green">
    <el-table :data="tData.length ? tData : []" height="100%" stripe>
      <el-table-column
        :key="item.label"
        v-for="item in thead"
        :label="item.label"
      >
        <template #default="{ row }">
          <span v-if="item.prop === 'today.confirm'">
            {{ row.today.confirm }}
          </span>
          <span v-else-if="item.prop === 'total.confirm'">
            {{ row.total.confirm }}
          </span>
          <span v-else-if="item.prop === 'total.heal'">
            {{ row.total.heal }}
          </span>
          <span v-else-if="item.prop === 'total.dead'">
            {{ row.total.dead }}
          </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from "element-plus";
import { useStore } from "@/store/index";
import { ref, toRaw, reactive } from "vue";

const store = useStore();
// let tData: any = reactive({ list: [] });
let tData: any = ref([]);
store.$subscribe((m, state) => {
  tData.value = state.item;
});

let thead = [
  { label: "地区", prop: "name" },
  { label: "新增确诊", prop: "today.confirm" },
  { label: "累计确诊", prop: "total.confirm" },
  { label: "治愈", prop: "total.heal" },
  { label: "死亡", prop: "total.dead" },
];
</script>

<style lang="less" scoped></style>
