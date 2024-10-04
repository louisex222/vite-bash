const fs = require('fs');
const path = require('path');
const papa = require('papaparse');



const csvToJson = (filePath:string):any=> {
  const csvData = fs.readFile(filePath,'utf8');
  const jsonData = papa.parse(csvData, {
    header: true,
    dynmicTypeing:true,
    skipEmptyLines: true,
    quotes:true,
  });
    return jsonData.data;
}

