const fs = require('fs');
const { parse } = require('csv-parse/sync');

const content = fs.readFileSync('eventNew.csv', 'utf8');
const tableArr = parse(content);


fs.writeFileSync('./src/data/eventNew.json', JSON.stringify(tableArr));
