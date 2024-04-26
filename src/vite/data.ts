


export interface ISlotGame {
    name:string
    id:any,
    imagePath: any,
    localizationCode :string,
    sort:number,
    clubId : number,
    categoryIdList: number[],
}
export interface ICardGame {
    name:string
    id:any,
    imagePath: any,
    localizationCode :string,
    sort:number,
    clubId : number,
    categoryIdList: number[],
}
export interface ITableGame {
    name:string
    id:any,
    imagePath: any,
    localizationCode :string,
    sort:number,
    clubId : number,
    categoryIdList: number[],
}

export interface IClub{
    thirdPartyId: string,
    name: string,
}

export interface  IDataversion {
    active: boolean,
    autopilot:  number,
    code : string,
    id : number,
    version: string,
}

export interface IPromotionData {
    eventNewBody_App: string,
    eventNewBody_Web: string,
    eventNewsCategory: string,
    eventNewsID: string,
    eventNewsImgUrl: string,
    eventNewsOutline: string,
    eventNewsTitle: string,
    sortAll: number
}

export interface IFrom {
    username:string,
    password: string,
}

