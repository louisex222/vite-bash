


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
export interface ILotteryGame {
    name:string
    id:any,
    imagePath: any,
    localizationCode :string,
    sort:number,
    clubId : number,
    categoryIdList: number[],
    desk:   string,
}
export interface IClub{
    thirdPartyId: string,
    name: string,
    id:string,
}

export interface  IDataversion {
    active: boolean,
    autopilot:  number,
    code : string,
    id : number,
    version: string,
}


export interface IFrom {
    username:string,
    password: string,
}
export interface IMemberInfo {

}

