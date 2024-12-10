const fs = require('fs');
const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const parser  = require('csv-parser');
// 主函數，執行轉換流程
const thirdPartyId = 'RSG'
const csvWriter = createCsvWriter({
    path: 'gameLists.csv',
    header:[
        {id: 'gameId', title: 'gameId'},
        {id: 'gameName', title: 'gameName'},
        {id: 'gameType', title: 'gameType'},
        {id: 'gameClubId', title: 'gameClubId'},
        {id: 'thirdPartyId', title: 'thirdPartyId'},
        {id: 'serverId', title: 'serverId'},
        {id: 'imagePath', title: 'imagePath'},
        {id: 'imageName', title: 'imageName'},
        {id: 'active', title: 'active'},
        {id: 'localizationCode', title: 'localizationCode'},
        {id: 'categoryIdList', title: 'categoryIdList'},
        {id: 'sort', title: 'sort'},
        {id: 'mType', title: 'mType'},
        {id: 'gType', title: 'gType'},
        {id: 'code', title: 'code'}
    ]
})

const xlsx = XLSX.readFile(`${thirdPartyId}.xlsx`);
const csv = fs.readFileSync(`${thirdPartyId}.csv`, 'utf8');
const sheetName = xlsx.SheetNames
const table = parse(csv)

const mapArr = {
    老虎機: '老虎機',
    其他: '老虎機',
    'game id': 'gameid',
    gTyp: 'gameid',
    mType: 'gameid',
    gameid: 'gameid',
    gamecode: 'gameid',
    KINDID: 'gameid',
    'Game Code遊戲代碼': 'gameid',
    'Product id': 'gameid',
    'Game Code': 'gameid',
    gametype: 'gameid',
    'Name(簡中)': 'zh-cn',
    'Name(繁中)': 'zh-tw',
    'Name(英)': 'en-us',
    'Name(泰)': 'th-th',
    'Name(越)': 'vi-vn',
    'Name(緬)': 'my-mm',
    'Name(日)': 'ja-jp',
    'Name(韓)': 'ko-kr',
    'Name(印)': 'id-id',
    'zh-cn簡中名稱': 'zh-cn',
    'zh-tw繁中名稱': 'zh-tw',
    "zh-tw繁中":'zh-tw',
    en英文名稱: 'en-us',
    th泰文名稱: 'th-th',
    vi越南名稱: 'vi-vn',
    "en英文": 'en-us',
    "zh-cn簡中": 'zh-cn',
    __EMPTY: 'down',
    "th泰文": 'th-th',
    "vi越南": 'vi-vn',
    "ja日文": 'ja-jp',
    "kr韓文": 'ko-kr',
    "id印尼文": 'id-id',
    "mm緬文": 'my-mm',
    "GameID": 'gameid',
    "fish(魚機)":'老虎機',
    "slot(老虎機)":'老虎機'
};
function csvToJson(filePath) {
    return new Promise((resolve, reject) => {
        const data:string[]= [];
        fs.createReadStream(filePath)
        .pipe(parser({ columns: true }))
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', () => {
            resolve(data);
        })
        .on('error', (err) => {
            reject(err);
        });
    });
}
function jsonToExcel(data, outputFilePath) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, outputFilePath);
    console.log('CSV 轉 Excel 完成');
}

const mappingThirdPartyId = ( thirdPartyId: string ) =>{
    switch (thirdPartyId) {
        case 'PS電子':
            return 'PS';
        case 'RSG':
            return 'Royal';
        default:
            return thirdPartyId
    }
}
const mappingImagePath = ( thirdPartyId: string ) =>{
    switch (thirdPartyId) {
        case 'PS電子':
            return 'PS';
        case 'RSG':
            return 'RSG';
        default:
            return thirdPartyId
    }
}
const localizationCode = ( thirdPartyId: string ) =>{
    switch (thirdPartyId) {
        case 'PS電子':
            return 'PS';
        default:
            return thirdPartyId
    }
}
const fcCheckGame = async(sheetIndex)=>{
    const sheet = xlsx.Sheets[sheetName[sheetIndex]];
    const arr = XLSX.utils.sheet_to_json(sheet);
    const searchArr = arr
    .map((item) => {
        const result = Object.entries(item).reduce((acc, [key, value]) => {
            const filterKey = key.replace('\n', '');
            const newKey = mapArr[filterKey];
            acc[newKey] = value + ''
            return acc;
        }, {});
        return result;
    })

    const gameData = table.slice(1).map((item)=>{
        return {
            gameId: item[0],
            gameName: item[1],
            gameType: item[2],
            gameClubId: item[3],
            thirdPartyId: item[4],
            serverId: item[5],
            imagePath: item[6],
            imageName: item[7],
            active: item[8],
            localizationCode: item[9],
            categoryIdList: item[10],
            sort: item[11],
            mType: item[12],
            gType: item[13],
            code: item[14]
        }
    })
    let down :any[] = []
        searchArr
    .forEach(search => {
        Object.entries(search).forEach(([, value]) => {
            if(value==='下架'){
                down.push(search['zh-tw'])
            }
        })
    })

    const mixData = gameData
    .map(item=>{
        const searchItem = searchArr.find(search =>search['zh-tw'] === item.gameName)
        const searchIndex = searchArr.findIndex(search =>search['zh-tw'] === item.gameName)
        const searchOther = searchArr.some(search => search['老虎機'] === '其他')
        const searchFish = searchArr.some(search => search['老虎機'] === '魚機')
        const searchFishSlot = searchArr.some(search => search['老虎機'] === 'fish(魚機)')
        const otherIndex = searchOther ? searchArr.findIndex(search => search['老虎機'] === '其他') : -1
        const fishIndex = searchFish ? searchArr.findIndex(search => search['老虎機'] === '魚機') : -1
        const fishSlotIndex = searchFishSlot ? searchArr.findIndex(search => search['老虎機'] === 'fish(魚機)') : -1
        const hotGameList = ['狗來富','侏羅紀寶藏','麻將發了','超級王牌2','迦羅寶石4','雷神之錘','聚寶財神','五龍爭霸','法老王','法老王 II','戰神呂布','羅馬競技場','有請財神','黃金摔角手','八爪天下海霸王','福娃捕魚']

        if(searchItem) {
            let category = ''
            let sort = 0
            let active = "True"
            category = '1,2'
            sort = searchIndex + 1

            if (hotGameList.includes(item.gameName)) {
                category = '1, 2, 4'
            }
            if (searchOther) {
                if (searchIndex > otherIndex) {
                    sort = searchIndex
                    category = '1, 6'
                    if (hotGameList.includes(item.gameName)) {
                        category = '1, 4, 6'
                    }
                }
            }
            if (searchFish) {
                if (searchIndex > fishIndex ) {
                    sort = searchIndex
                    category = '1, 3'
                    if (hotGameList.includes(item.gameName)) {
                        category = '1, 3, 4'
                    }
                }
            }
            if (searchFishSlot) {
                if (searchIndex > fishSlotIndex ) {
                    sort = searchIndex
                    category = '1, 3'
                    if (hotGameList.includes(item.gameName)) {
                        category = '1, 3, 4'
                    }
                }
            }

            return {
                ...item,
                gameName: searchItem['zh-tw'],
                thirdPartyId: mappingThirdPartyId(thirdPartyId),
                imagePath: mappingImagePath(thirdPartyId),
                imageName: searchItem.gameid,
                localizationCode: `${localizationCode(thirdPartyId)}_${searchItem.gameid}`,
                categoryIdList: category,
                sort: sort,
                active: active,
            }
        }
    })
    .filter((item)=> !!item && !down.includes(item.gameName))
    .map((item)=> {
        const list ={
            ...item,
        }
        return list
    })

    csvWriter.writeRecords(mixData).then(() => {
        console.log('...Done');
    })
}

 const init = ()=>{
    Object.keys(sheetName).forEach(async (item) => {
        if(sheetName[item] === thirdPartyId){
            await fcCheckGame(item)
        }
    });
}

// ---------------------------------------------------
const csvFilePath = 'gameLists.csv';
const excelFilePath = 'gameLists.xlsx';
 async function main() {
    init()
    // 這兩段式讀取csv檔案轉成excel
    const jsonData = await csvToJson(csvFilePath);
    jsonToExcel(jsonData, excelFilePath);
}

main().catch((error) => console.error(error));


