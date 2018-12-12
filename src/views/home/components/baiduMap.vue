<template>
  <div class="body">
    <baidu-map
      ref="baiduMap"
      class="map"
      :center="center"
      :zoom="zoom"
      :min-zoom="minZoom"
      :scroll-wheel-zoom="true"
      :map-click="false"
      @moving="getCenterAndZoom"
      @moveend="getCenterAndZoom"
      @zoomend="getCenterAndZoom"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type> -->
      <!-- <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation> -->
      <!-- <bm-scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-scale> -->

      <Button
        class="fullScreenBtn"
        @click="fullScreenClk"
      >
        <Icon :type="fullScreenIcon"></Icon>
      </Button>
      <Button
        class="setDefaultViewBtn"
        @click="setDefaultViewClk"
      >
        <Icon type="location"></Icon>
      </Button>
    </baidu-map>
    <Spin
      size="large"
      fix
      v-if="spinShow"
    >
    </Spin>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  data() {
    return {
      spinShow: false,
      //初始化地图中心
      center: {
        lng: 108.879436,
        lat: 34.197712
      },
      //初始化缩放等级
      zoom: 5,
      minZoom: 4,
      currentCenter: {},
      currentZoom: "",
      infoWindowShow: false,
      //初始化infoWindow弹出位置
      point: {
        position: {
          lng: "",
          lat: ""
        }
      },

      fullScreenIcon: "arrow-expand",
      fullScreen: false,
      deviceTypeSearch: "",
      customerSearch: "",
      deviceTypeDataList: [],
      customerDataList: [],
      deviceDataList: []
    };
  },
  methods: {
    //全屏
    fullScreenClk() {
      if (this.fullScreen) {
        this.$router.go(-1);
      } else {
        this.$router.push({
          name: "fullScreenMap"
        });
      }
    },

    //获取当前视图的中心点坐标
    getCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.currentCenter.lng = lng;
      this.currentCenter.lat = lat;
      this.currentZoom = e.target.getZoom();
    },

    //设置默认地图视图
    setDefaultViewClk() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>是否将当前显示区域设置为默认显示区域？</p>",
        onOk: () => {
          if (Cookies.get("rememberme")) {
            Cookies.set("center", this.currentCenter, {
              expires: 7
            });
            Cookies.set("zoom", this.currentZoom, {
              expires: 7
            });
          } else {
            Cookies.set("center", this.currentCenter);
            Cookies.set("zoom", this.currentZoom);
          }
          this.$Message.success("设置成功");
        },
        onCancel: () => {}
      });
    },

    //从cookie中获取地图中心和缩放等级
    setCenterAndZoom() {
      var cmapCenter = Cookies.get("center");
      var cmapZoom = Cookies.get("zoom");
      if (cmapCenter != undefined && cmapZoom != undefined) {
        this.center = JSON.parse(cmapCenter);
        this.zoom = parseInt(cmapZoom);
      }
    }
  },
  mounted() {},
  created() {
    this.setCenterAndZoom();
  }
};
</script>
<style lang="less">
@import "../../../styles/common.less";
.check-btn {
  display: inline-block;
  border: 1px solid #dddee1;
  padding: 7px 4px 1px 8px; // height: 30px;
  // margin-top: -6px;
  border-radius: 3px;
  background-color: white;
  font-size: 8px;
}

.body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.conts {
  position: absolute;
  top: 15px;
  left: 60px; // width: 100%;
}

.map {
  width: 100%;
  height: 100%;
}

.refresh {
  font-size: 20px;
  padding: 0px 15px 0px 15px;
}

.fullScreenBtn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  padding: 0px 15px 0px 15px;
}

.exitFullScreenBtn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  padding: 0px 15px 0px 15px;
}

.setDefaultViewBtn {
  position: absolute;
  top: 15px;
  right: 65px;
  font-size: 20px;
  padding: 0px 15px 0px 15px;
}

/*去除百度地图版权信息*/

.anchorBL {
  display: none;
}
</style>
