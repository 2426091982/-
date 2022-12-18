import { defineStore } from "pinia";
import { getList } from "../utils/https";
import { RootObject, Children, ChinaAdd, ChinaTotal } from "../types";
export const useStore = defineStore("map-list", {
  state: () => {
    return {
      list: <RootObject>{},
      item: <Children[]>[],
      chinaAdd: <ChinaAdd>{},
      chinaTotal: <ChinaTotal>{},
    };
  },
  actions: {
    async getList() {
      this.list = await getList();
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd;
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal;
    },
  },
});
