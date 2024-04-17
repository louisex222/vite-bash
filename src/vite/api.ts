export interface ILoginParam {
    account: string,
    password: string,
    uidKey: string,
}
export interface IChangePwdParam {
    oldPassword: string,
    password: string,
    password_Check: string
}

export interface IPromotionList {
    Language:string
}

export interface ITableList{
    gameType: number
}

export interface IServerId {
    thirdParty_id: string,
}
