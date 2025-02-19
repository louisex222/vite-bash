const fss = require('fs');
const XLSXs = require('xlsx');
const { parse: csvParse } = require('csv-parse/sync');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const parser  = require('csv-parser');
// 主函數，執行轉換流程
const thirdPartyId = 'IDN'
const csvWriter = createCsvWriter({
    path: 'gameLists.csv',
    header:[
        {id: 'id', title: 'id'},
        {id: 'gameType', title: 'gameType'},
        {id: 'thirdPartyId', title: 'thirdPartyId'},
        {id: 'clubType', title: 'clubType'},
        {id: 'name', title: 'name'},
        {id: 'active', title: 'active'},
        {id: 'localizationCode', title: 'localizationCode'},
        {id: 'deskDisplayName', title: 'deskDisplayName'},
        {id: 'imageName', title: 'imageName'},
        {id: 'imagePath', title: 'imagePath'},
        {id: 'desk', title: 'desk'},
        {id: 'categoryIdList', title: 'categoryIdList'},
        {id: 'sort', title: 'sort'},
        {id:'serverId',title:'serverId'},
        {id:'style',title:'style'}
    ]
})

const xlsx = XLSXs.readFile(`${thirdPartyId}.xlsx`);
const csv = fss.readFileSync(`${thirdPartyId}.csv`, 'utf8');
const sheetName = xlsx.SheetNames
const table = csvParse(csv)  //廠商csv資料
const mapArr = {
    "老虎機": '老虎機',
    "其他": '老虎機',
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
    "en英文名稱": 'en-us',
    "th泰文名稱": 'th-th',
    "vi越南名稱": 'vi-vn',
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
    "slot(老虎機)":'老虎機',
    "zh-tw":'zh-tw',
    "zh-cn":'zh-cn',
    "en":'en-us',
    "th":'th-th',
    "vi":'vi-vn',
    "mm":'my-mm',
    "kr":'ko-kr',
    "ja": 'ja-jp',
    'ja\n日文': 'ja-jp',
    '編號': 'id',
    '繁體中文zh-tw': 'zh-tw',
    '簡體中文zh-cn': 'zh-cn',
    '英文en-us': 'en-us',
    '泰文th-th': 'th-th',
    '官網分類':'官網分類',
    '官網報表分類':'官網報表分類',
    'slug':'gameid'
}; //將header統一格式

const mappingThirdPartyId = ( thirdPartyId: string ) =>{
    switch (thirdPartyId) {
        case 'PS電子':
            return 'PS';
        case 'RSG':
            return 'Royal';
        case 'RG slot':
            return 'RGRICH';
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
        case 'RG slot':
            return 'RGRICH';
        default:
            return thirdPartyId
    }
}
const localizationCode = ( thirdPartyId: string ) =>{
    switch (thirdPartyId) {
        case 'PS電子':
            return 'PS';
        case 'RG slot':
            return 'RGRICH';
        default:
            return thirdPartyId
    }
}
const mappingClubType = (clubType:string) =>{
    let club = ''
    switch (clubType){
        case '百家樂':
            club = 'baccarat'
            break;
        case '龍虎':
            club = 'DT'    
            break;
        case '輪盤':
            club = 'roulette'    
            break;
        case '特色遊戲':
            club = 'other'
            break;
        default:
            club = 'baccarat'
            break;
    }
    return club
}
// 功能邏輯
const fcCheckGame = async(sheetIndex)=>{
    const sheet = xlsx.Sheets[sheetName[sheetIndex]];
    const arr = XLSXs.utils.sheet_to_json(sheet);
    //將xlsx資料key轉成統一格式並重組排列
    const searchArr:any = arr
    .map((item:any) => {
        return Object.entries(item).reduce((acc, [key, value]) => {
            const filterKey = key.replace(/[\r\n\s]/g, '');
            const newKey = mapArr[filterKey];
            acc[newKey] = value + ''
            return acc;
        }, {});
    }).filter((item)=>{
        //濾出 item裡的值有'v'的資料 限制小v
        return Object.values(item).some((value)=> value === 'v')
    })

    // xlsx資料轉成map獲得總數
    const orderMap :any = new Map(searchArr.map((item,index)=> [item['zh-tw'],index]))
    //csv資料組合map獲得完整資料
    const gameData = table.slice(1).map((item)=>{
        return {
            id: item[0],
            gameType: item[1],
            thirdPartyId: item[2],
            clubType: item[3],
            name: item[4],
            active: item[5],
            localizationCode: item[6],
            deskDisplayName: item[7],
            imageName: item[8],
            imagePath: item[9],
            desk: item[10],
            categoryIdList: item[11],
            sort: item[12],
            serverId: item[13],
            style: item[14]
        }
    })

 

    //csv資料少於xlsx資料時新增沒有的資料
    orderMap.forEach((_,key)=>{
        const gameId = searchArr.find((item)=> item['zh-tw'] === key)?.gameid
        if(!gameData.find((item)=> item.name === key)){
            gameData.push({
                ...gameData[0],
                name: key,
                imagePath: thirdPartyId,
                imageName: gameId,
                desk: gameId,
                localizationCode: `${localizationCode(thirdPartyId)}_${gameId}`,
                sort: (orderMap.get(key) + 1).toString(),
            })

        }
    })

    //下架的遊戲名
    let down :any[] = []
        searchArr
    .forEach(search => {
        Object.entries(search).forEach(([, value]) => {
            if(value==='下架'){
                down.push(search['zh-tw'])
            }
        })
    })
    // 搜尋遊戲名稱排序
    function getSearchInfo(item, searchArr) {
        const searchItem = searchArr.find(search => search['zh-tw'] === item.name);
        const searchIndex = searchItem ? searchArr.indexOf(searchItem) : -1;
        const hotGameList = ['百家樂', '龍虎','輪盤 2 快速桌','6D 顏色','24D 大獎','骰子狂熱 6'];
        const isHotGame = hotGameList.includes(item.name);
        let category = '1';
        let sort = searchIndex + 1;
        let active = "True";
        if (isHotGame) {
            category = '1, 4';
        }
        return {
            searchItem,
            searchIndex,
            isHotGame,
            category,
            sort,
            active,
        };
    }

    const mixData = gameData
    .map(item=>{
        const searchInfo = getSearchInfo(item, searchArr);
        const {searchItem,  category, sort, active} = searchInfo;
        if(searchItem) {
            return {
                ...item,
                name: searchItem['zh-tw'],
                clubType: mappingClubType(searchItem['官網分類']),
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
    .filter((item)=> !!item)
    .map((item)=> {
        if(down.includes(item.gameName)){
            item.active = "False"
        }
        return item
    })


    // 寫入csv檔案
    csvWriter.writeRecords(mixData).then(() => {
        console.log('...Done');
    })
}

// 初始化 遍歷所有sheetName
 const init = ()=>{
    Object.keys(sheetName).forEach(async (item) => {
        if(sheetName[item] === thirdPartyId){
            await fcCheckGame(item)
        }
    });
}

// ---------------------------------------------------

const csvFilePaths = 'gameLists.csv';
const excelFilePaths = 'gameLists.xlsx';
const csvToJsons = (filePath) => {
    return new Promise((resolve, reject) => {
        const data:string[]= [];
        fss.createReadStream(filePath)
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
const  jsonToExcels = (data, outputFilePath) => {
    const worksheet = XLSXs.utils.json_to_sheet(data);
    const workbook = XLSXs.utils.book_new();
    XLSXs.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSXs.writeFile(workbook, outputFilePath);
    console.log('CSV 轉 Excel 完成');
}
 const  mains = async() => {
    init()
    // 這兩段式讀取csv檔案轉成excel
    const jsonData = await csvToJsons(csvFilePaths);
    jsonToExcels(jsonData, excelFilePaths);
}

mains().catch((error) => console.error(error));


