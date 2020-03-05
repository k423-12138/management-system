<template>
  <div class="index_es">
    
    <div id="main" style="width: 600px;height:400px;"></div>
    <div id="main01" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
export default {
  methods: {
    test() {
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById("main"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 销售"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      myChart.setOption(option);
    },
    test01() {
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById("main01"));

      var option01 = {
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ]
          }
        ]
      };
      myChart.setOption(option01);
    }
  },
  mounted() {
    this.test();
    this.test01();
  }
};
</script>
<style >
  .index_es{
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    display: flex;

  }
</style>