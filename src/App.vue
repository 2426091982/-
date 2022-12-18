<template>
  <div class="container dark" :style="{ backgroundImage: `url(${bg})` }">
    <div class="left">
      <div class="box">
        <div class="map" ref="china"></div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <el-row :gutter="20" style="height: 100%">
          <el-col :span="12">
            <transition name="el-zoom-in-center">
              <Card></Card>
            </transition>
          </el-col>
          <el-col :span="12">
            <div style="width: 100%; height: 100%" ref="pin"></div>
          </el-col>
        </el-row>
      </div>
      <div class="middle">
        <transition name="el-zoom-in-center">
          <List></List>
        </transition>
      </div>
      <div class="bottom">
        <div class="line" ref="line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "./store/index";
import { onMounted, ref, toRaw } from "vue";
import * as echarts from "echarts";
import type { EChartsResponsiveOption } from "echarts";
import { geoCoordMap } from "./json/geomap";
import bg from "@/assets/wallhaven.jpeg";
import "./json/china.js";
import List from "@/components/List.vue";
import Card from "@/components/Card.vue";

const china = ref<null | HTMLElement>(null);
const pin = ref<null | HTMLElement>(null);
const line = ref<null | HTMLElement>(null);
const store = useStore();

onMounted(async () => {
  await store.getList();
  initEcharts()();
});

const initEcharts = () => {
  const tempData = store.list.diseaseh5Shelf;
  const city = tempData.areaTree[0].children;

  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
      // 默认选中
      selected: v.name === "广东",
    };
  });
  const pinData = data
    .map((item) => {
      console.log(item);
      return {
        value: item.value[2],
        name: item.name,
      };
    })
    .slice(2);
  // 默认展示广东
  store.item = data[3].children;

  return () => {
    const mapCharts = echarts.init(china.value as HTMLElement);
    const mapOptions = {
      title: {
        text: "新冠疫情趋势地图",
        textStyle: {
          color: "#fff",
          lineHeight: 60,
          fontSize: 30,
        },
      },
      geo: {
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"],
        layoutSize: "100%",
        itemStyle: {
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#152E6E", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0673AD", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          shadowColor: "#47352a",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        },
        emphasis: {
          areaColor: "#493326",
        },

        regions: [
          {
            name: "南海诸岛",
            itemStyle: {
              areaColor: "rgba(0, 10, 52, 1)",
              borderColor: "rgba(0, 10, 52, 1)",
              opacity: 0,
              label: {
                show: false,
                color: "#009cc9",
              },
            },
            label: {
              show: false,
              color: "#FFFFFF",
              fontSize: 12,
            },
          },
        ],
      },
      series: [
        {
          type: "map",
          map: "china",
          aspectScale: 0.8,
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "100%",
          label: {
            show: true,
            color: "#000",
            fontSize: 12,
            position: ["50%", "50%"],
          },
          itemStyle: {
            areaColor: "#d9c2ae",
            borderColor: "#614b3d",
            borderWidth: 1.8,
          },
          emphasis: {
            areaColor: "#3e3026",
            label: {
              show: true,
              color: "#fff",
            },
          },
          data: data,
        },
        {
          type: "scatter",
          coordinateSystem: "geo",
          symbol: "pin",
          symbolSize: [45, 45],
          hoverAnimation: true,
          large: true,
          label: {
            show: true,
            color: "#fff",
            borderColor: "#1b1b1d",
            // echart 格式化函数回调
            formatter(value: any) {
              return value.data.value[2];
            },
          },

          itemStyle: {
            color: "#19191a", //标志颜色
          },
          data: data,
        },
      ],
    };
    mapCharts.setOption(mapOptions);
    mapCharts.on("click", (e: any) => {
      store.item = e.data.children;
      console.log(store.item);
    });
    const pinCharts = echarts.init(pin.value as HTMLElement);
    const pinOptions = {
      backgroundColor: "#2c343c",
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },

      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          label: {
            show: true,
          },
          itemStyle: {
            borderRadius: 4,
            borderColor: "#fff",
            borderWidth: 1,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },

          data: pinData,
        },
      ],
    };
    pinCharts.setOption(pinOptions as EChartsResponsiveOption);

    const lineCharts = echarts.init(line.value as HTMLElement);
    const lineOptions = {
      backgroundColor: "#2c343c",
      title: {
        text: "累计确诊人数",
        textStyle: {
          color: "#fff",
          lineHeight: 40,
          fontSize: 14,
        },
      },
      xAxis: {
        type: "category",
        data: city.slice(2,10).map((v) => v.name),
        axisLine: {
          lineStyle: {
            color: "#fff",
            lineHeight: 40,
            fontSize: 14,
          },
        },
      },
      legend: {
        data: city.slice(2,10).map((v) => v.name),
      },
      tooltip: {
        trigger: "axis",
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff",
            lineHeight: 40,
            fontSize: 14,
          },
        },
      },
      series: [
        {
          data: city.slice(2,10).map((v) => {
            return { name: v.name, value: v.total.confirm };
          }),
          type: "line",
          smooth: true,
          label: {
            show: true, //在每个上面显示当前值
          },
        },
      ],
    };

    lineCharts.setOption(lineOptions as EChartsResponsiveOption);
  };
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-size: cover;
  box-sizing: border-box;
  .left {
    padding: 10px 5px 10px 10px;

    flex: 1;
    display: flex;
    flex-direction: column;
    .map {
      flex: 1;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .box {
      flex: 1;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      .map {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 5px;
    .top {
      flex: 1;
      height: 100%;
      overflow: hidden;
      padding: 10px;
      background-color: rgba(223, 198, 178, 0.5);
    }
    .middle {
      flex: 1;
      height: 100%;

      overflow: hidden;
      padding: 10px;
      background-color: rgba(223, 198, 178, 0.5);
    }
    .bottom {
      flex: 1;
      height: 100%;
      overflow: hidden;
      padding: 10px;
      background-color: rgba(223, 198, 178, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .line {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
