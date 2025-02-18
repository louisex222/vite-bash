
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

export interface ISlotGameParam {
    thirdPartyId: string,
}
export interface ITableGameParam {
    thirdPartyId: string,
}
export interface ITableListParam{
    gameType: number
}

export interface IServerIdParam {
    thirdParty_id: string,
}

export interface  IMemberInfoParam{
    account: string
}

export interface IUserOrderParam{
    amount: string,
    paymentType: string,
    password:  string,
}

export interface IBankTransfersParam{
    amount: string,
    paymentType: string,
    password: string,
}
