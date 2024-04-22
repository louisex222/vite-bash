export interface Game{
    name: string,
    id: string,
    imagePath:any,
    desk: string,
}
export interface Club{
    thirdPartyId: string,
    name: string,
}

export interface IClubList
        {
            thirdPartyId: string,
            games: Game[]
        }



