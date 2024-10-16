const fs = require('fs');
const XLSX = require('xlsx');
const { stringify } = require('csv-stringify');
const { parse } = require('csv-parse/sync');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const parser  = require('csv-parser');
// 主函數，執行轉換流程
const bigTile ='分類規格總表'
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
const csvs = fs.readFileSync(`${thirdPartyId}.csv`, 'utf8');
const sheetName = xlsx.SheetNames
const table = parse(csvs)
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

    const gameData =   table.slice(1).map((item)=>{
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
        const searchIndex = searchArr.findIndex(search => search['zh-tw'] === item.gameName)
        const searchOther = searchArr.findIndex(search => search['老虎機'] === '其他')
        const searchFish = searchArr.findIndex(search => search['老虎機'] === '魚機')

        let category = ''
        if(searchItem){
            if(searchIndex  > searchOther && searchIndex < searchFish){
                category = '1, 6'
            }
            else if(searchIndex  > searchFish ){
                category = '1, 3'
            }
            else{
                category = '1, 2'
            }
            return {
                ...item,
                gameName: searchItem['zh-tw'],
                gameId: searchItem.gameid,
                thirdPartyId: thirdPartyId,
                imagePath: searchItem.gameid,
                localizationCode: `Game_${thirdPartyId}_${searchItem.gameid}`,
                categoryIdList: category
            }
        }
        return item
    })

    csvWriter.writeRecords(mixData).then(() => {
        console.log('...Done');
    })
}

const allGame =async(sheetIndex)=>{
    const sheet = xlsx.Sheets[sheetName[sheetIndex]];
    const arr = XLSX.utils.sheet_to_json(sheet);
    const searchArr = arr
    console.log(searchArr)
}
const init = ()=>{
    Object.keys(sheetName).forEach(async (item) => {
        if(sheetName[item] === thirdPartyId){
            // await fcCheckGame(item)
        }
        if(sheetName[item] === bigTile){
            await allGame(item)
        }
    });
}


// ---------------------------------------------------
const csvFilePath = 'gameLists.csv';
const excelFilePath = 'gameLists.xlsx';
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

// 將 JSON 轉換為 Excel 並保存
function jsonToExcel(data, outputFilePath) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, outputFilePath);
    console.log('CSV 轉 Excel 完成');
}


async function main() {
    init()
    // 這兩段式讀取csv檔案轉成excel
    const jsonData = await csvToJson(csvFilePath);
    jsonToExcel(jsonData, excelFilePath);
}

main().catch((error) => console.error(error));
