const fs = require('fs');
const csv = require('csv-parser');

const csvToJson = (csvFilePath,jsonFilePath) =>{
    const results :any[] =[];
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            const sanitizedData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                    key.trim(),
                    (value as string).trim().replace(/'/g, '"') || ''
                ])
            );
            results.push(sanitizedData);
        })
        .on('end', () => {
            fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
            console.log('CSV 转换为 JSON 完成');
        });
}


const jsonToCsv = (jsonFilePath,csvFilePath) => {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath,'utf-8'));
    const headers = Object.keys(jsonData[0]).map(header => header.trim()).join(',');

    const csvLines = jsonData.map(row => {
        return Object.values(row)
            .map(value => (value as string).trim().replace(/'/g, '"') || '')
            .join(',');
    });

    const csvContent = `${headers}\n${csvLines.join('\n')}`;
    fs.writeFileSync(csvFilePath, csvContent);
    console.log('JSON 轉換為 CSV 完成');
}

const csvFilePath = "input.csv";
const jsonFilePath = 'output.json';
csvToJson(csvFilePath,jsonFilePath);
jsonToCsv(jsonFilePath, 'output_reconverted.csv');
