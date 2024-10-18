const fs = require('fs');
const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const parser  = require('csv-parser');
// 主函數，執行轉換流程
const thirdPartyId = 'JDB'
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
    '紅字是獨家遊戲不能下架': 'time',
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
const fcCheckGame = async(sheetIndex)=>{
    const sheet = xlsx.Sheets[sheetName[sheetIndex]];
    const arr = XLSX.utils.sheet_to_json(sheet);
    const searchArr = arr
    .map((item) => {
        const result = Object.entries(item).reduce((acc, [key, value]) => {
            const filterKey = key.replace('\n', '');
            const newKey = mapArr[filterKey];
            acc[newKey] = value;
            return acc;
        }, {});
        return result;
    })
    .filter((item)=>{
        return   item.gameid !== '素材連結' && item.time !== '10/4通知永久下架'
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
    const mixData = gameData.map(item=>{
        const searchItem = searchArr.find(search =>search['zh-tw'] === item.gameName)
        const searchIndex = searchArr.findIndex(search =>search['zh-tw'] === item.gameName)
        const searchOther = searchArr.some(search => search['老虎機'] === '其他')
        const searchFish = searchArr.some(search => search['老虎機'] === '魚機')
        const otherIndex = searchOther ? searchArr.findIndex(search => search['老虎機'] === '其他') : -1
        const fishIndex = searchFish ? searchArr.findIndex(search => search['老虎機'] === '魚機') : -1
        const hotGameList = [ '小豬銀行', '牛運寶藏', '魔幻王牌' , '超級牛B', '聚寶盆', '超級牛B 豪華版', '星際水果霸', '瘋狂金魚', '芝麻開門2', '雷神之鎚', '大三元', '金剛' ,'財神捕魚', '五龍捕魚', '捕魚一路發', '龍王捕魚']
        if(searchItem){
            let category = ''
            category = '1,2'
            if(hotGameList.includes(item.gameName)){
                category ='1, 2, 4'
            }
            if(searchOther){
                if(searchIndex > otherIndex){
                    category = '1, 6'
                    if(hotGameList.includes(item.gameName)){
                        category ='1, 4, 6'
                    }
                }
            }
            if(searchFish){
                if(searchIndex > fishIndex){
                    category = '1, 3'
                    if(hotGameList.includes(item.gameName)){
                        category ='1, 3, 4'
                    }
                }
            }

            return {
                ...item,
                gameName: searchItem['zh-tw'],
                gameId: searchItem.gameid,
                thirdPartyId: thirdPartyId,
                imagePath: searchItem.gameid,
                imageName: searchItem.gameid,
                localizationCode: `Game_${thirdPartyId}_${searchItem.gameid}`,
                categoryIdList: category,
                sort: searchIndex + 1,
            }
        }
    })

    csvWriter.writeRecords(mixData).then(() => {
        ('...Done');
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
