const fs = require('fs');
const { parse } = require('csv-parse/sync');
const XLSX = require('xlsx');

/**
 * 目前語系
 * TODO: 新增語系
 */
const langArray = ['zh-tw', 'zh-cn', 'en-us', 'th-th', 'ko-kr', 'my-mm', 'id-id', 'vi-vn', 'ja-jp', 'ms-my', 'es-es', 'lo-lao'];

const langs = langArray.reduce((result, lang) => {
    const last = result;
    last[lang] = {};
    return last;
}, {});

const csv = fs.readFileSync('langs.csv', 'utf8');
const xlsx = XLSX.readFile('langList.xlsx');
const sheetName = xlsx.SheetNames;

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
    'zh-tw繁中': 'zh-tw',
    en英文名稱: 'en-us',
    th泰文名稱: 'th-th',
    vi越南名稱: 'vi-vn',
    en英文: 'en-us',
    'zh-cn簡中': 'zh-cn',
    __EMPTY: 'down',
    th泰文: 'th-th',
    vi越南: 'vi-vn',
    ja日文: 'ja-jp',
    kr韓文: 'ko-kr',
    id印尼文: 'id-id',
    mm緬文: 'my-mm',
    GameID: 'gameid',
    'fish(魚機)': '老虎機',
    'slot(老虎機)': '老虎機',
    'zh-tw': 'zh-tw',
    'zh-cn': 'zh-cn',
    en: 'en-us',
    th: 'th-th',
    vi: 'vi-vn',
    mm: 'my-mm',
    kr: 'ko-kr',
    ja: 'ja-jp',
    'ja\n日文': 'ja-jp',
    '繁體中文zh-tw': 'zh-tw',
    '簡體中文zh-cn': 'zh-cn',
    '英文en-us':'en-us',
    '泰文th-th':'th-th',
    '韓文ko-kr':'ko-kr',
    '緬甸語my-mm':'my-mm',
    '印尼語id-id':'id-id',
    '越南文vi-vn':'vi-vn',
    '日文ja-jp': 'ja-jp',
};
const tableArr = parse(csv);

const changeName = (sheetIndex) => {
    const thirdPartyId = sheetName[sheetIndex];
    let third = '';
    switch (thirdPartyId) {
        case 'RG slot':
            third = 'RGRICH';
            break;
        case 'MT棋牌':
            third = 'MT';
            break;
        case 'MP棋牌':
            third = 'MP';
            break;
        case 'AMEBA':
            third = 'AE';
            break;
        default:
            third = thirdPartyId;
    }
    return third;
};
const fcCheckGameName = async (sheetIndex) => {
    const sheet = xlsx.Sheets[sheetName[sheetIndex]];
    const sheetArr = XLSX.utils.sheet_to_json(sheet);
    const searchArr = sheetArr.map((item) => {
        const result = Object.entries(item).reduce((acc, [key, value]) => {
            const filterKey = key.replace('\n', '');
            const newKey = mapArr[filterKey];
            acc[newKey] = value;
            return acc;
        }, {});
        return result;
    }).map((item) => {
        let Reorganization = '';
        switch (changeName(sheetIndex)) {
            case 'RGRICH':
                Reorganization = `${changeName(sheetIndex)}_${item.gameid}`;
                break;
            case 'GEMINI':
                Reorganization = `${changeName(sheetIndex)}_${item.gameid}`;
                break;
            default:
                Reorganization = `${changeName(sheetIndex)}_${item.gameid}`;
                break;
        }

        return {
            ...item,
            name: Reorganization
        };
    });

    // console.log(searchArr);
    tableArr
        .slice(1)
        .forEach(([id, ...args]) => {
            args.slice(1).forEach((element, index) => {
                const flag = searchArr
                    .some((item) => Object.values(item).includes(element) && item.name === id);
                const halfFlag = searchArr
                    .some((item) => {
                        return item.name === id && !Object.values(item).includes(element)
                    });
                const lang = langArray[index];
                if (lang === undefined || element === '') return;
                if (flag) {
                    // console.log(`key: ${id} lang: ${lang} name: ${element}  正確✅`);
                    if (searchArr.filter((item) => item.name === id).length > 1) {
                        // console.log(`key: ${id} lang: ${lang} name: ${element}  重複❌`);
                    }

                } else if (halfFlag) {
                    console.log(`key: ${id} lang: ${lang} name: ${element}  錯誤❌`);
                }
            });
        });
};

Object.keys(sheetName).forEach(async (sheet) => {
    await fcCheckGameName(Number(sheet));
});

// 處理翻譯
tableArr
    .slice(1)
    .forEach(([id, ...args]) => {
        args.slice(1).forEach((element, index) => {
            const lang = langArray[index];
            if (lang === undefined || element === '') return;
            langs[lang][id] = element;
        });
    });

