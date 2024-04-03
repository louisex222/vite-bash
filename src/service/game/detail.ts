import index from '../index'

// Path: src/service/index.ts
// Compare this snippet from src/service/index.ts:
// import axios from 'axios';
//
export const getList = () => {
    return index({
        url: '/api/slotGameList',
        method: 'get',
        data: {}
    })
}

