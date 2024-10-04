<template>
  <button @click="start">start</button>
  <button @click="pause">pause</button>
  <button @click="disabled = true">disabled</button>
  <div class="csv-wrap flex flex-wrap overflow-scroll h-300px ">
    <VueDraggable
        ref="el"
        v-model="list"
        :disabled="disabled"
        :animation="150"
        ghostClass="ghost"
        class="csv-drap flex flex-col gap-2 p-4 w-300px w-96 h-300px  bg-gray-500/5 rounded"
        @start="onStart"
        @update="onUpdate"
        @end="onEnd"
    >
      <div
          v-for="item in list"
          :key="item.sort"
          class="csv-item cursor-move h-30 bg-gray-500/5 rounded p-3"
      >
        {{ item.gameName }} {{ item.sort }}
      </div>
    </VueDraggable>
  </div>
    <div class="preview flex flex-col flex-direction-column w-52">
      {{listCom}}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  type DraggableEvent,
  type UseDraggableReturn,
  VueDraggable
} from 'vue-draggable-plus'
const list = ref([
  {
    "gameId": "49",
    "gameName": "超級王牌",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "49",
    "active": "True",
    "localizationCode": "Game_JILI_049",
    "categoryIdList": "1, 2, 4",
    "sort": "1",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "1",
    "gameName": "钱龙捕鱼",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "001",
    "active": "True",
    "localizationCode": "Game_JILI_001",
    "categoryIdList": "1, 3",
    "sort": "1",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "60",
    "gameName": "飞龙宝藏",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "060",
    "active": "True",
    "localizationCode": "Game_JILI_060",
    "categoryIdList": "1, 3",
    "sort": "2",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "103",
    "gameName": "黃金帝國",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "103",
    "active": "True",
    "localizationCode": "Game_JILI_103",
    "categoryIdList": "1, 2, 4",
    "sort": "2",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "71",
    "gameName": "夺宝传奇",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "071",
    "active": "True",
    "localizationCode": "Game_JILI_071",
    "categoryIdList": "1, 3",
    "sort": "3",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "109",
    "gameName": "迦羅寶石",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "109",
    "active": "True",
    "localizationCode": "Game_JILI_109",
    "categoryIdList": "1, 2, 4",
    "sort": "3",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "212",
    "gameName": "獵龍大亨2",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "212",
    "active": "True",
    "localizationCode": "Game_JILI_212",
    "categoryIdList": "1, 3",
    "sort": "4",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "51",
    "gameName": "瘋狂錢來也",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "051",
    "active": "True",
    "localizationCode": "Game_JILI_051",
    "categoryIdList": "1, 2",
    "sort": "4",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "119",
    "gameName": "全明星捕魚",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "119",
    "active": "True",
    "localizationCode": "Game_JILI_119",
    "categoryIdList": "1, 3, 4",
    "sort": "5",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "77",
    "gameName": "拳王",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "077",
    "active": "True",
    "localizationCode": "Game_JILI_077",
    "categoryIdList": "1, 2",
    "sort": "5",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "102",
    "gameName": "羅馬X",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "102",
    "active": "True",
    "localizationCode": "Game_JILI_102",
    "categoryIdList": "1, 2",
    "sort": "6",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "32",
    "gameName": "極速彩金捕魚",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "032",
    "active": "True",
    "localizationCode": "Game_JILI_032",
    "categoryIdList": "1, 3, 4",
    "sort": "6",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "82",
    "gameName": "開心捕魚",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "082",
    "active": "True",
    "localizationCode": "Game_JILI_082",
    "categoryIdList": "1, 3, 4",
    "sort": "7",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "35",
    "gameName": "瘋狂777",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "035",
    "active": "True",
    "localizationCode": "Game_JILI_035",
    "categoryIdList": "1, 2",
    "sort": "7",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "74",
    "gameName": "王者捕魚",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "074",
    "active": "True",
    "localizationCode": "Game_JILI_074",
    "categoryIdList": "1, 3, 4",
    "sort": "8",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "134",
    "gameName": "無限王牌",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "134",
    "active": "True",
    "localizationCode": "Game_JILI_134",
    "categoryIdList": "1, 2",
    "sort": "8",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "42",
    "gameName": "獵龍大亨",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "042",
    "active": "True",
    "localizationCode": "Game_JILI_042",
    "categoryIdList": "1, 3, 4",
    "sort": "9",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "110",
    "gameName": "阿里巴巴",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "110",
    "active": "True",
    "localizationCode": "Game_JILI_110",
    "categoryIdList": "1, 2",
    "sort": "9",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "20",
    "gameName": "炸魚來了",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "020",
    "active": "True",
    "localizationCode": "Game_JILI_020",
    "categoryIdList": "1, 3",
    "sort": "10",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "92",
    "gameName": "瘋狂砲手",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "092",
    "active": "True",
    "localizationCode": "Game_JILI_092",
    "categoryIdList": "1, 2",
    "sort": "10",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "47",
    "gameName": "衝鋒野牛",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "047",
    "active": "True",
    "localizationCode": "Game_JILI_047",
    "categoryIdList": "1, 2",
    "sort": "11",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "289",
    "gameName": "海王彩金",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "289",
    "active": "True",
    "localizationCode": "Game_JILI_289",
    "categoryIdList": "1, 3",
    "sort": "11",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "85",
    "gameName": "法老祕寶",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "085",
    "active": "True",
    "localizationCode": "Game_JILI_085",
    "categoryIdList": "1, 2",
    "sort": "12",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "38",
    "gameName": "封神",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "038",
    "active": "True",
    "localizationCode": "Game_JILI_038",
    "categoryIdList": "1, 2",
    "sort": "13",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "30",
    "gameName": "人魚甜心",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "030",
    "active": "True",
    "localizationCode": "Game_JILI_030",
    "categoryIdList": "1, 2",
    "sort": "14",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "17",
    "gameName": "上海甜心",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "017",
    "active": "True",
    "localizationCode": "Game_JILI_017",
    "categoryIdList": "1, 2",
    "sort": "15",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "137",
    "gameName": "瘋狂淘金",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "137",
    "active": "True",
    "localizationCode": "Game_JILI_137",
    "categoryIdList": "1, 2",
    "sort": "16",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "2",
    "gameName": "秦皇傳說",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "2",
    "active": "True",
    "localizationCode": "Game_JILI_002",
    "categoryIdList": "1, 2",
    "sort": "17",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "130",
    "gameName": "雷神X",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "130",
    "active": "True",
    "localizationCode": "Game_JILI_130",
    "categoryIdList": "1, 2",
    "sort": "18",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "126",
    "gameName": "慶典之月",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "126",
    "active": "True",
    "localizationCode": "Game_JILI_126",
    "categoryIdList": "1, 2",
    "sort": "19",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "135",
    "gameName": "瑪雅帝國",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "135",
    "active": "True",
    "localizationCode": "Game_JILI_135",
    "categoryIdList": "1, 2",
    "sort": "20",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "183",
    "gameName": "黄金小丑",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "183",
    "active": "True",
    "localizationCode": "Game_JILI_183",
    "categoryIdList": "1, 2",
    "sort": "21",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "145",
    "gameName": "招财猫",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "145",
    "active": "True",
    "localizationCode": "Game_JILI_145",
    "categoryIdList": "1, 2",
    "sort": "22",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "181",
    "gameName": "百搭王牌",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "181",
    "active": "True",
    "localizationCode": "Game_JILI_181",
    "categoryIdList": "1, 2",
    "sort": "23",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "176",
    "gameName": "功夫虎",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "176",
    "active": "True",
    "localizationCode": "Game_JILI_176",
    "categoryIdList": "1, 2",
    "sort": "24",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "223",
    "gameName": "迦罗宝石2",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "223",
    "active": "True",
    "localizationCode": "Game_JILI_223",
    "categoryIdList": "1, 2",
    "sort": "25",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "209",
    "gameName": "帝国女祭司",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "209",
    "active": "True",
    "localizationCode": "Game_JILI_209",
    "categoryIdList": "1, 2",
    "sort": "26",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "144",
    "gameName": "吉利财神",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "144",
    "active": "True",
    "localizationCode": "Game_JILI_144",
    "categoryIdList": "1, 2",
    "sort": "27",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "16",
    "gameName": "丛林之王",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "016",
    "active": "True",
    "localizationCode": "Game_JILI_16",
    "categoryIdList": "1, 2",
    "sort": "28",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "45",
    "gameName": "疯狂抢金乐",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "045",
    "active": "True",
    "localizationCode": "Game_JILI_45",
    "categoryIdList": "1, 2",
    "sort": "29",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "27",
    "gameName": "极速777",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "027",
    "active": "True",
    "localizationCode": "Game_JILI_27",
    "categoryIdList": "1, 2",
    "sort": "30",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "33",
    "gameName": "极速猪来了",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "033",
    "active": "True",
    "localizationCode": "Game_JILI_33",
    "categoryIdList": "1, 2",
    "sort": "31",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "48",
    "gameName": "霸金砖",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "048",
    "active": "True",
    "localizationCode": "Game_JILI_48",
    "categoryIdList": "1, 2",
    "sort": "32",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "142",
    "gameName": "赏金猎人",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "142",
    "active": "True",
    "localizationCode": "Game_JILI_142",
    "categoryIdList": "1, 2",
    "sort": "33",
    "mType": "0",
    "gType": "0",
    "code": ""
  },
  {
    "gameId": "164",
    "gameName": "海盗女王",
    "gameType": "3",
    "gameClubId": "22",
    "thirdPartyId": "JILI",
    "serverId": "2000000002",
    "imagePath": "JILI",
    "imageName": "164",
    "active": "True",
    "localizationCode": "Game_JILI_164",
    "categoryIdList": "1, 2",
    "sort": "34",
    "mType": "0",
    "gType": "0",
    "code": ""
  }
])
const listCom =computed(() => {
  return list.value.map(item => item.sort)

})
const el = ref<UseDraggableReturn>()
const disabled = ref(false)
function pause() {
  el.value?.pause()
}

function start() {
  el.value?.start()
}

const onStart = (e: DraggableEvent) => {
  console.log('start', e)
}

const onEnd = (e: DraggableEvent) => {
  // list.value.forEach((item, index) => {
  //   item.sort = index + 1
  // })
  console.log('onEnd', e)
}

const onUpdate = () => {
  console.log('update')
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.csv-wrap{
  width: 80%;
  height: 700px;
  .csv-drap{
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    .csv-item{
      width: 10%;
      height: 100px;
    }
  }

}
.preview{
  position: absolute;
  top: 100px;
  right: 0;
  width: 20%;
}

</style>
