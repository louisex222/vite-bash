const fs = require('fs');
const parse = require('csv-parser');
const XLSX = require('xlsx');
const { stringify } = require('csv-stringify');


// 讀取 CSV 文件並轉換為 JSON
function csvToJson(filePath) {
    return new Promise((resolve, reject) => {
        const data:string[]= [];
        fs.createReadStream(filePath)
            .pipe(parse({ columns: true }))
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
}

const workbook = XLSX.readFile('GameList.xlsx');
// 獲取第一個工作表
const sheet_name_list = workbook.SheetNames;
const worksheet = workbook.Sheets[sheet_name_list[0]];
// 將工作表轉換為 JSON 對象
const data = XLSX.utils.sheet_to_json(worksheet);
let orderMap :any = new Map(data.map((item, index) => [item.gameName, index ]));
// 讀取 Excel 並轉換為 JSON
function excelToJson(filePath) {
    console.log(data)
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let jsonData = XLSX.utils.sheet_to_json(worksheet);
    jsonData = jsonData.map(item => {
        const gamekey = data.find(game => game.gameName === item.gameName);
        item.sort = (orderMap.get(item.gameName) + 1 ).toString();
        item.gameId = gamekey.gameId;
        item.imageName = gamekey.gameId;
        item.categoryIdList = gamekey.categoryIdList;
        item.localizationCode =gamekey.function;
        return item;
    });
    jsonData.sort((a, b) => orderMap.get(a.gameName) - orderMap.get(b.gameName));
    return jsonData
}

// 將 JSON 轉換為 CSV 並保存
function jsonToCsv(data, outputFilePath) {
    console.log(data)
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
}

// 主函數，執行轉換流程
const csvFilePath = 'input.csv';
const excelFilePath = 'output.xlsx';
const newCsvFilePath = 'output.csv';
async function main() {
    // 這兩段式讀取csv島案轉乘excel
    const jsonData = await csvToJson(csvFilePath);
    jsonToExcel(jsonData, excelFilePath);
    console.log('CSV 轉 Excel 完成');
    //

    // 這兩段式修改玩excel檔案轉成csv
    const newJsonData = excelToJson(excelFilePath);
    jsonToCsv(newJsonData, newCsvFilePath);

    console.log('Excel 轉 csv 完成');
}

main().catch((error) => console.error(error));
