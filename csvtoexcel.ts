const fs = require('fs');
const parse = require('csv-parser');
const XLSX = require('xlsx');
const { stringify } = require('csv-stringify');

const workbook = XLSX.readFile('GameList.xlsx');
// 獲取第一個工作表
const sheet_name_list = workbook.SheetNames;
const worksheet = workbook.Sheets[sheet_name_list[0]];
// 將工作表轉換為 JSON 對象
const data = XLSX.utils.sheet_to_json(worksheet);
let orderMap :any = new Map(data.map((item, index) => [item.gameName, index ]));
// 讀取 Excel 並轉換為 JSON
const exampleData ={
    gameId: 1,
    gameName: 'test',
    gameType: '3',
    gameClubId: '9',
    thirdPartyId: 'JDB',
    serverId: '1002300079',
    imagePath: 'JDB',
    imageName: 7007,
    active: 'True',
    localizationCode: 'Game_JDB_7007',
    categoryIdList: '1, 3',
    sort: '59',
    mType: '0',
    gType: 0,
    code: '0'
}
let exitData = []

const csvFilePath = 'input.csv';
const excelFilePath = 'input.xlsx';
const newExcelFilePath = 'output.xlsx';
const newCsvFilePath = 'output.csv';
// 讀取 CSV 文件並轉換為 JSON
function csvToExcel(csvFilePath, outputFilePath) {
    // 讀取 CSV 文件
    const workbook = XLSX.readFile(csvFilePath, {codepage: 65001});

    // 將讀取的第一個工作表存到新的 Excel 工作簿中
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // 創建新的 Excel 工作簿
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');

    // 將工作簿保存為 Excel 文件
    XLSX.writeFile(newWorkbook, outputFilePath);
    console.log('CSV 轉 Excel 完成');

}

function excelToJson(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData = XLSX.utils.sheet_to_json(worksheet);
    exitData = jsonData;
    console.log(exitData.length === 0)

    const firstData = jsonData[0] ? jsonData[0] : exampleData;
    let addData :any[]= []
    orderMap.forEach((value:number, key:string) => {
       if(!jsonData.find(item => item.gameName === key)){
           addData = jsonData.push({
            ...firstData,
            gameName: key,
            sort: (value + 1).toString
           })
       }
    });
    const useData = addData.length > 0 ? addData : jsonData;
    jsonData = useData.map(item => {
        const gamekey :any = data.find(game => game.gameName === item.gameName);
        item.sort = (orderMap.get(item.gameName) + 1 ).toString();
        item.gameId = gamekey.gameId;
        item.imageName = gamekey.imageName;
        item.categoryIdList = gamekey.categoryIdList;
        item.localizationCode =gamekey.localizationCode;
        return item;
    })
    .sort((a, b) => orderMap.get(a.gameName) - orderMap.get(b.gameName));
    return jsonData
}

// 將 JSON 轉換為 CSV 並保存
function jsonToCsv(data, outputFilePath) {
    const stringifiedData = data.map(row => {
        const newRow = {};
        for (const key in row) {
            if (Object.hasOwnProperty.call(row, key)) {
                newRow[key] = String(row[key]); // 確保每個值都是字串
            }
        }
        return newRow;
    });

    stringify(stringifiedData, { header: true, quote: '"' }, (err, output) => {
        if (err) throw err;
        fs.writeFileSync(outputFilePath, output);
    });
    console.log('Excel 轉 csv 完成');
}

// 主函數，執行轉換流程

async function main() {
    // 這兩段式讀取csv檔案轉成excel
    csvToExcel(csvFilePath, excelFilePath);
    //
    // 這兩段式修改玩excel檔案轉成csv
    const newJsonData = excelToJson(excelFilePath);
    jsonToCsv(newJsonData, newCsvFilePath);
    csvToExcel(newCsvFilePath, newExcelFilePath);


}

main().catch((error) => console.error(error));
